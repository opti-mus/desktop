import { useEffect, useRef } from "react"

const offset = 10

export const parseTranslate = (transform: string) => {
    const match = transform.match(/translate\(\s*(-?[\d.]+)px,\s*(-?[\d.]+)px\s*\)/)

    return {
        x: match ? Number(match[1]) : 0,
        y: match ? Number(match[2]) : 0
    }
}

export const useResizeWindow = () => {
    const refWindow = useRef<HTMLElement>(null)

    useEffect(() => {
        let startMove = {
            left: false,
            right: false,
            top: false,
            bottom: false
        }

        let startData = {
            mouseX: 0,
            mouseY: 0,
            width: 0,
            height: 0,
            translateX: 0,
            translateY: 0
        }



        const resetMove = () => {
            startMove = {
                left: false,
                right: false,
                top: false,
                bottom: false
            }

            document.body.style.userSelect = ''
            document.body.style.cursor = ''
        }

        const mouseDownHandler = (e: MouseEvent) => {
            const target = e.target as HTMLElement

            if (target.dataset?.window) {
                refWindow.current = target
            }

            const window = refWindow.current

            if (!window) return

            const bbox = window.getBoundingClientRect()

            const transform = window.style.transform
            const { x, y } = parseTranslate(transform)

            startData = {
                mouseX: e.clientX,
                mouseY: e.clientY,
                width: bbox.width,
                height: bbox.height,
                translateX: x,
                translateY: y
            }

            if (window.dataset?.window) {
                startMove = {
                    left: Math.abs(e.clientX - bbox.left) <= offset,
                    right: Math.abs(e.clientX - bbox.right) <= offset,
                    top: Math.abs(e.clientY - bbox.top) <= offset,
                    bottom: Math.abs(e.clientY - bbox.bottom) <= offset
                }
            }

            document.body.style.userSelect = 'none'
        }

        const mouseMoveHandler = (e: MouseEvent) => {
            const target = e.target as HTMLElement

            if (target.dataset?.window) {
                refWindow.current = target
            }

            const window = refWindow.current

            if (!window) return

            const bbox = window?.getBoundingClientRect()

            // cursor
            document.body.style.cursor = ''

            if (
                target.dataset?.window &&
                (Math.abs(e.clientX - bbox.left) <= offset || Math.abs(e.clientX - bbox.right) <= offset)
            ) {
                document.body.style.cursor = 'ew-resize'
            }

            if (
                target.dataset?.window &&
                (Math.abs(e.clientY - bbox.top) <= offset || Math.abs(e.clientY - bbox.bottom) <= offset)
            ) {
                document.body.style.cursor = 'ns-resize'
            }

            // LEFT
            if (startMove.left) {
                const deltaX = e.clientX - startData.mouseX

                const newWidth = startData.width - deltaX
                const newTranslateX = startData.translateX + deltaX

                if (newWidth > 50) {
                    window.style.width = `${newWidth}px`

                    window.style.transform = `translate(${newTranslateX}px, ${startData.translateY}px)`
                }
            }

            // RIGHT
            if (startMove.right) {
                const deltaX = e.clientX - startData.mouseX

                const newWidth = startData.width + deltaX

                if (newWidth > 50) {
                    window.style.width = `${newWidth}px`
                }
            }

            // TOP
            if (startMove.top) {
                const deltaY = e.clientY - startData.mouseY

                const newHeight = startData.height - deltaY
                const newTranslateY = startData.translateY + deltaY

                if (newHeight > 50) {
                    window.style.height = `${newHeight}px`

                    window.style.transform = `translate(${startData.translateX}px, ${newTranslateY}px)`
                }
            }

            // BOTTOM
            if (startMove.bottom) {
                const deltaY = e.clientY - startData.mouseY

                const newHeight = startData.height + deltaY

                if (newHeight > 50) {
                    window.style.height = `${newHeight}px`
                }
            }
        }

        const mouseUpHandler = () => {
            resetMove()
        }

        document.addEventListener('mousedown', mouseDownHandler)
        document.addEventListener('mousemove', mouseMoveHandler)
        document.addEventListener('mouseup', mouseUpHandler)

        return () => {
            document.removeEventListener('mousedown', mouseDownHandler)
            document.removeEventListener('mousemove', mouseMoveHandler)
            document.removeEventListener('mouseup', mouseUpHandler)
        }
    }, [])
}