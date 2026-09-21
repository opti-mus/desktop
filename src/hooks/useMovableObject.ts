
import { useEffect, useRef, useState } from 'react'
import type { MousePosition, Shortcut, WindowTemplate } from '../types/config'
import { parseTranslate } from './useResizeWindow'


type MovableType = {
    moveObject?: WindowTemplate | Shortcut
}

export const isWindowTemplate = (data?: WindowTemplate | Shortcut): data is WindowTemplate => {
    if (!data) return false
    return 'render' in data
}

type MovableTypeReturn = {
    startMoveHandler: (e: React.MouseEvent) => void
    position: MousePosition
    isMoving: boolean,
    refObject: React.RefObject<HTMLDivElement | null>
}

export const useMovableObject = ({ moveObject }: MovableType): MovableTypeReturn => {
    const refObject = useRef<HTMLDivElement | null>(null)

    const [isMoving, setIsMoving] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const startMoveHandler = (e: React.MouseEvent) => {
        const element = refObject.current

        if (!element) return

        const startMouseX = e.clientX
        const startMouseY = e.clientY

        const startTranslate = parseTranslate(element.style.transform)

        document.body.style.cursor = 'grabbing'
        document.body.style.userSelect = 'none'

        const onMouseMove = (event: MouseEvent) => {
            const deltaX = event.clientX - startMouseX
            const deltaY = event.clientY - startMouseY

            const x = startTranslate.x + deltaX
            const y = startTranslate.y + deltaY

            element.style.transform = `translate(${x}px, ${y}px)`

            setPosition({ x, y })
            setIsMoving(true)
        }

        const onMouseUp = () => {
            setIsMoving(false)

            document.body.style.userSelect = ''
            document.body.style.cursor = ''

            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)
        }

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
    }

    useEffect(() => {
        if (!refObject.current || !moveObject?.position) return

        const element = refObject.current
        const { x, y } = moveObject.position

        element.style.transform = `translate(${x}px, ${y}px)`

    }, [])

    const prevIsMaximized = useRef(moveObject?.isMaximized)

    useEffect(() => {
        if (!isWindowTemplate(moveObject)) return
        if (!refObject.current || !moveObject?.position) return
        if (prevIsMaximized.current === moveObject?.isMaximized) return

        const { x, y } = position

        refObject.current.style.transform = moveObject.isMaximized
            ? 'translate(0, 0)'
            : `translate(${x}px, ${y}px)`

        prevIsMaximized.current = moveObject.isMaximized
    }, [moveObject?.isMaximized])



    return {
        startMoveHandler,
        isMoving,
        position,
        refObject
    }
}

