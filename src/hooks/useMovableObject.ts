import { useState } from 'react'

type MovablePosition = {
    x: number
    y: number
}

type MovableType = {
    refObject: React.RefObject<HTMLElement | null>
}

type MovableTypeReturn = {
    startMoveHandler: (e: React.MouseEvent) => void

    position: MovablePosition
    isMoving: boolean
}

export const useMovableObject = ({ refObject }: MovableType): MovableTypeReturn => {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isMoving, setIsMoving] = useState(false)
    

    const startMoveHandler = (e: React.MouseEvent) => {
        const startX = e.pageX
        const startY = e.pageY

        
        document.body.style.cursor = 'grab'
        document.body.style.userSelect = 'none'

        const offsetX = startX - position.x
        const offsetY = startY - position.y

        const newPos = { x: 0, y: 0 }

        const onMouseMove = (event: MouseEvent) => {
            const newX = event.pageX - offsetX
            const newY = event.pageY - offsetY

            newPos.x = newX
            newPos.y = newY

            setPosition(newPos)
            setIsMoving(true)

            if (refObject?.current) {
                refObject.current.style.transform = `translate(${newPos.x}px, ${newPos.y}px)`
            }
        }

        const onMouseUp = () => {
            setIsMoving(false)

            document.body.style.userSelect = 'auto'
            document.body.style.cursor = 'default'

            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)
        }

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
    }

    return {
        startMoveHandler,
        position,
        isMoving
    }
}
