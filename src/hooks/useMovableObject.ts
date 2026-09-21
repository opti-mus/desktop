
import { useState } from 'react'
import { parseTranslate } from './useResizeWindow'


type MovableType = {
    refObject: React.RefObject<HTMLElement | null>
}

type MovableTypeReturn = {
    startMoveHandler: (e: React.MouseEvent) => void
    isMoving: boolean
}

export const useMovableObject = ({ refObject, }: MovableType): MovableTypeReturn => {
    const [isMoving, setIsMoving] = useState(false)
    

    const startMoveHandler = (e: React.MouseEvent) => {
        const element = refObject.current

        
        document.body.style.cursor = 'grab'
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

    return {
        startMoveHandler,
        isMoving,
    }
}

