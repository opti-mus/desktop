import type { MousePosition, Shortcut, WindowDimension, WindowTemplate } from "../types/config"
import { parseTranslate } from "../utils"


type StartMoveType = {
    left: boolean,
    right: boolean,
    top: boolean,
    bottom: boolean
}
type StartDataType = {
    mouseX: number,
    mouseY: number,
    width: number,
    height: number,
    translateX: number,
    translateY: number
}
type BindType = {
    flag?: string
    callback: (event: MouseEvent, instance: WindowController) => void
    invocationCount: number
}

export class WindowController {
    private _isDragging: boolean

    static instance: WindowController
    static OFFSET = 10

    startMove?: StartMoveType
    startData: StartDataType
    moveData: Map<string, MousePosition>
    refWindow: HTMLElement | null
    windowDimensions: WindowDimension


    public bindings: Map<string, BindType[]>
    constructor() {

        this.startData = {
            mouseX: 0,
            mouseY: 0,
            width: 0,
            height: 0,
            translateX: 0,
            translateY: 0
        }
        this.moveData = new Map()
        this.refWindow = null
        this.windowDimensions = { width: 0, height: 0 }
        this.bindings = new Map()
        this._isDragging = false

        if (WindowController.instance) return WindowController.instance

        WindowController.instance = this

        this.init()

    }

    init() {
        document.addEventListener('mousedown', this.mouseDownHandler.bind(this))
        document.addEventListener('mousemove', this.mouseMoveHandler.bind(this))
        document.addEventListener('mouseup', this.mouseUpHandler.bind(this))

        this.bindCallbacks()
    }
    destroy() {
        document.removeEventListener('mousedown', this.mouseDownHandler)
        document.removeEventListener('mousemove', this.mouseMoveHandler)
        document.removeEventListener('mouseup', this.mouseUpHandler)
    }

    applyDimensions(target: HTMLElement | null, window: WindowTemplate | Shortcut) {
        if (!target || !window?.position) return

        const { x, y } = window.position

        target.style.transform = `translate(${x}px, ${y}px)`

        target.style.width = `${window.dimensions?.width}px`
        target.style.height = `${window.dimensions?.height}px`
    }

    maximizeWindow(target: HTMLElement | null, window: WindowTemplate) {
        if (!target || !window.position) return
        const { isMaximized, position } = window

        target.style.transform = isMaximized ? 'translate(0,0)' : `translate(${position.x}px, ${position.y}px)`
    }

    addCallback<T extends WindowController[]>(
        event: string,
        callback: (event: MouseEvent, instance: WindowController, ...args: T) => void,
        flag?: string,
        ...args: T
    ) {
        const newCallback = (event: MouseEvent, instance: WindowController) => {
            callback(event, instance, ...args)
        }

        const entry = { callback: newCallback, flag, invocationCount: 0 }
        const callbacks = this.bindings.get(event) || []
        const unique = callbacks.filter(entry => entry.flag !== flag)
        unique.push(entry)

        this.bindings.set(event, unique)
    }

    private bindCallbacks() {
        this.bindings.set('mousedown', [])
        this.bindings.set('mousemove', [])
        this.bindings.set('mouseup', [])

    }

    triggerCallbacks(event: string, eventData: MouseEvent) {
        const callbacks = this.bindings.get(event)

        if (callbacks) {
            callbacks.forEach(entry => {
                entry.invocationCount += 1
                entry.callback(eventData, this)
            })
        }
    }

    mouseDownHandler(e: MouseEvent) {
        const target = e.target as HTMLElement
        const windowDOM = target.closest('[data-window]') as HTMLElement

        if (windowDOM) {
            this.refWindow = windowDOM
        }

        const window = this.refWindow

        if (!window) return

        const bbox = window.getBoundingClientRect()
        this.windowDimensions = { width: bbox.width, height: bbox.height }

        const transform = window.style.transform
        const { x, y } = parseTranslate(transform)

        if (this.windowID) {
            this.startData = {
                mouseX: e.clientX,
                mouseY: e.clientY,
                width: bbox.width,
                height: bbox.height,
                translateX: x,
                translateY: y
            }

        }


        if (windowDOM) {
            this.startMove = {
                left: Math.abs(e.clientX - bbox.left) <= WindowController.OFFSET,
                right: Math.abs(e.clientX - bbox.right) <= WindowController.OFFSET,
                top: Math.abs(e.clientY - bbox.top) <= WindowController.OFFSET,
                bottom: Math.abs(e.clientY - bbox.bottom) <= WindowController.OFFSET
            }
        }

        document.body.style.userSelect = 'none'

        this.triggerCallbacks('mousedown', e)
    }
    mouseMoveHandler(e: MouseEvent) {
        const target = e.target as HTMLElement
        const windowDOM = target.closest('[data-window]') as HTMLElement

        if (windowDOM) {
            this.refWindow = windowDOM
        }

        const window = this.refWindow

        if (!window) return

        const bbox = window?.getBoundingClientRect()

        this.triggerCallbacks('mousemove', e)
        this.windowDimensions = { width: bbox.width, height: bbox.height }


        if (this._isDragging) {
            document.body.style.cursor = 'grab'

            const deltaX = e.clientX - this.startData.mouseX
            const deltaY = e.clientY - this.startData.mouseY

            const x = this.startData.translateX + deltaX
            const y = this.startData.translateY + deltaY

            window.style.transform = `translate(${x}px, ${y}px)`

            if (this.windowID) {

                this.moveData.set(this.windowID, { x, y })
            }
            return
        }

        if (!this.startMove) {
            document.body.style.cursor = ''
            if (!target.dataset?.window) return
            if (Math.abs(e.clientX - bbox.left) <= WindowController.OFFSET || Math.abs(e.clientX - bbox.right) <= WindowController.OFFSET) {
                document.body.style.cursor = 'ew-resize'
            }

            if ((Math.abs(e.clientY - bbox.top) <= WindowController.OFFSET || Math.abs(e.clientY - bbox.bottom) <= WindowController.OFFSET)) {
                document.body.style.cursor = 'ns-resize'
            }
            return
        }

        // LEFT
        if (this.startMove.left) {
            const deltaX = e.clientX - this.startData.mouseX

            const newWidth = this.startData.width - deltaX
            const newTranslateX = this.startData.translateX + deltaX

            if (newWidth > 50) {
                window.style.width = `${newWidth}px`

                window.style.transform = `translate(${newTranslateX}px, ${this.startData.translateY}px)`
                this.windowDimensions.width = newWidth
            }
        }

        // RIGHT
        if (this.startMove.right) {
            const deltaX = e.clientX - this.startData.mouseX

            const newWidth = this.startData.width + deltaX

            if (newWidth > 50) {
                window.style.width = `${newWidth}px`
                this.windowDimensions.width = newWidth
            }
        }

        // TOP
        if (this.startMove.top) {
            const deltaY = e.clientY - this.startData.mouseY

            const newHeight = this.startData.height - deltaY
            const newTranslateY = this.startData.translateY + deltaY

            if (newHeight > 50) {
                window.style.height = `${newHeight}px`

                window.style.transform = `translate(${this.startData.translateX}px, ${newTranslateY}px)`
            }
        }

        // BOTTOM
        if (this.startMove.bottom) {
            const deltaY = e.clientY - this.startData.mouseY

            const newHeight = this.startData.height + deltaY

            if (newHeight > 50) {
                window.style.height = `${newHeight}px`
                this.windowDimensions.height = newHeight
            }
        }

        // cursor
        // document.body.style.cursor = ''

        // console.log('@target', target);
        // if (!target.dataset?.window) return



        // if (
        //     (Math.abs(e.clientX - bbox.left) <= WindowController.OFFSET && Math.abs(e.clientY - bbox.bottom) <= WindowController.OFFSET)
        // ) {
        //     document.body.style.cursor = 'ne-resize'
        // }

        // if (

        //     (Math.abs(e.clientX - bbox.right) <= WindowController.OFFSET && Math.abs(e.clientY - bbox.bottom) <= WindowController.OFFSET)
        // ) {
        //     document.body.style.cursor = 'nw-resize'
        // }
    }
    mouseUpHandler(e: MouseEvent) {
        this.triggerCallbacks('mouseup', e)
        this.resetMove()
    }

    resetMove() {
        this.startMove = undefined
        this.isDragging = false
        document.body.style.userSelect = ''
        document.body.style.cursor = ''
        this.refWindow = null
    }

    get windowID() {
        return this.refWindow?.dataset?.window
    }

    set isDragging(value: boolean) {
        this._isDragging = value
    }
}