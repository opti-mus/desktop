import type { DesktopObject, DialogType, MousePosition, WindowDimension } from "../types/config"
import { parseTranslate } from "../utils"
import { SelectionModule } from "./modules/selection.module"


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
type BindingEvent = 'mousedown' | 'mouseup' | 'mousemove' | 'selection:start' | 'selection:move' | 'selection:end' | 'selection:clear' | 'grab:bulk'

export class WindowController {
    static instance: WindowController
    static OFFSET = 10

    private bindings: Map<BindingEvent, BindType[]>

    public selectionModule: SelectionModule
    public startData: StartDataType
    public startMove?: StartMoveType
    public moveData: Map<string, MousePosition>
    public windowDimensions: WindowDimension
    public refWindow: HTMLElement | null
    public isDragging: boolean
    public isResizing: boolean



    constructor() {
        this.selectionModule = new SelectionModule(this)
        this.startData = {
            mouseX: 0,
            mouseY: 0,
            width: 0,
            height: 0,
            translateX: 0,
            translateY: 0
        }
        this.moveData = new Map()
        this.bindings = new Map()

        this.windowDimensions = { width: 0, height: 0 }
        this.refWindow = null
        this.isDragging = false
        this.isResizing = false


        if (WindowController.instance) return WindowController.instance

        WindowController.instance = this

        this.init()

    }

    public init() {
        document.addEventListener('mousedown', this.mouseDownHandler.bind(this))
        document.addEventListener('mousemove', this.mouseMoveHandler.bind(this))
        document.addEventListener('mouseup', this.mouseUpHandler.bind(this))

        this.bindCallbacks()
        this.selectionModule.init()
    }

    public destroy() {
        document.removeEventListener('mousedown', this.mouseDownHandler)
        document.removeEventListener('mousemove', this.mouseMoveHandler)
        document.removeEventListener('mouseup', this.mouseUpHandler)
    }

    private mouseDownHandler(e: MouseEvent) {
        document.body.style.userSelect = 'none'

        const windowDOM = this.getWindowDOM(e)

        if (windowDOM) {
            this.refWindow = windowDOM
        }

        this.startData.mouseX = e.clientX
        this.startData.mouseY = e.clientY

        this.triggerCallbacks('mousedown', e)

        const inSelections = this.selectionModule.selections.has(windowDOM?.id)

        if (!inSelections) {
            this.triggerCallbacks('selection:clear', e)
            this.selectionModule.selections.clear()
        }

        if (!this.refWindow) return

        const bbox = this.refWindow.getBoundingClientRect()
        this.windowDimensions = { width: bbox.width, height: bbox.height }

        const transform = this.refWindow.style.transform
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
    }

    private mouseMoveHandler(e: MouseEvent) {
        const windowDOM = this.getWindowDOM(e)

        const deltaX = e.clientX - this.startData.mouseX
        const deltaY = e.clientY - this.startData.mouseY

        const x = this.startData.translateX + deltaX
        const y = this.startData.translateY + deltaY

        this.triggerCallbacks('mousemove', e)

        if (this.isDragging) {
            if (!this.refWindow) return

            if (this.selectionModule.selections.size) {
                this.selectionModule.selections.forEach((data, inx) => {
                    if (data) {
                        const deltaX = e.clientX - this.startData.mouseX
                        const deltaY = e.clientY - this.startData.mouseY

                        const newPosition = { x: data.x + deltaX, y: data.y + deltaY }
                        const DOM = this.selectionModule.researchObjects.get(inx)

                        if (DOM) {
                            DOM.style.transform = `translate(${newPosition.x}px, ${newPosition.y}px)`
                            this.moveData.set(inx, { x, y })
                        }
                    }
                })
                this.triggerCallbacks('grab:bulk', e)

                return
            }

            document.body.style.cursor = 'grab'
            this.refWindow.style.transform = `translate(${x}px, ${y}px)`

            if (this.windowID) {

                this.moveData.set(this.windowID, { x, y })
            }
            return
        }

        if (!this.startMove) {
            const bbox = windowDOM?.getBoundingClientRect()
            document.body.style.cursor = ''
            if (!windowDOM) return

            if (Math.abs(e.clientX - bbox.left) <= WindowController.OFFSET || Math.abs(e.clientX - bbox.right) <= WindowController.OFFSET) {
                document.body.style.cursor = 'ew-resize'
            }

            if ((Math.abs(e.clientY - bbox.top) <= WindowController.OFFSET || Math.abs(e.clientY - bbox.bottom) <= WindowController.OFFSET)) {
                document.body.style.cursor = 'ns-resize'
            }
            return
        }

        if (!this.refWindow) return

        const bbox = this.refWindow?.getBoundingClientRect()

        this.windowDimensions = { width: bbox.width, height: bbox.height }

        // LEFT
        if (this.startMove.left) {
            const deltaX = e.clientX - this.startData.mouseX

            const newWidth = this.startData.width - deltaX
            const newTranslateX = this.startData.translateX + deltaX

            if (newWidth > 50) {
                this.refWindow.style.width = `${newWidth}px`

                this.refWindow.style.transform = `translate(${newTranslateX}px, ${this.startData.translateY}px)`
                this.windowDimensions.width = newWidth
                this.isResizing = true
            }
        }

        // RIGHT
        if (this.startMove.right) {
            const deltaX = e.clientX - this.startData.mouseX

            const newWidth = this.startData.width + deltaX

            if (newWidth > 50) {
                this.refWindow.style.width = `${newWidth}px`
                this.windowDimensions.width = newWidth
                this.isResizing = true
            }
        }

        // TOP
        if (this.startMove.top) {
            const deltaY = e.clientY - this.startData.mouseY

            const newHeight = this.startData.height - deltaY
            const newTranslateY = this.startData.translateY + deltaY

            if (newHeight > 50) {
                this.refWindow.style.height = `${newHeight}px`
                this.windowDimensions.height = newHeight
                this.isResizing = true

                this.refWindow.style.transform = `translate(${this.startData.translateX}px, ${newTranslateY}px)`

            }
        }

        // BOTTOM
        if (this.startMove.bottom) {
            const deltaY = e.clientY - this.startData.mouseY

            const newHeight = this.startData.height + deltaY

            if (newHeight > 50) {
                this.refWindow.style.height = `${newHeight}px`
                this.windowDimensions.height = newHeight
                this.isResizing = true
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
    private mouseUpHandler(e: MouseEvent) {
        this.triggerCallbacks('mouseup', e)
        this.resetMove()
    }

    public getWindowDOM(e: MouseEvent) {
        const target = e.target as HTMLElement
        const windowDOM = target.closest('[data-window]') as HTMLElement

        return windowDOM
    }

    public applyDimensions(target: HTMLElement | null, window: DesktopObject<DialogType.BASE | DialogType.WIDGET | DialogType.SHORTCUT>) {
        if (!target || !window?.position) return

        const { x, y } = window.position

        target.style.transform = `translate(${x}px, ${y}px)`

        target.style.width = `${window.dimensions?.width}px`
        target.style.height = `${window.dimensions?.height}px`
    }

    public maximizeWindow(target: HTMLElement | null, window: DesktopObject<DialogType.BASE | DialogType.WIDGET>) {
        if (!target || !window.position) return
        const { isMaximized, position } = window

        target.style.transform = isMaximized ? 'translate(0,0)' : `translate(${position.x}px, ${position.y}px)`
    }

    public addCallback<T extends WindowController[]>(
        event: BindingEvent,
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

        this.bindings.set('selection:start', [])
        this.bindings.set('selection:move', [])
        this.bindings.set('selection:end', [])
        this.bindings.set('selection:clear', [])

        this.bindings.set('grab:bulk', [])

    }

    public triggerCallbacks(event: BindingEvent, eventData: MouseEvent) {
        const callbacks = this.bindings.get(event)

        if (callbacks) {
            callbacks.forEach(entry => {
                entry.invocationCount += 1
                entry.callback(eventData, this)
            })
        }
    }

    private resetMove() {
        this.startMove = undefined
        this.isDragging = false
        this.isResizing = false
        this.refWindow = null

        document.body.style.userSelect = ''
        document.body.style.cursor = ''
    }

    public get windowID() {
        return this.refWindow?.dataset?.window
    }


}