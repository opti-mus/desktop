import { useMemo, type PropsWithChildren } from 'react'
import { baseMovableObject, movableStore, type MovableObject } from '../../state/MovableSilce'

interface MovableComponentProps extends PropsWithChildren {
    className?: string
    id: string
}
export type MovableComponentRef = {
    isMoving?: boolean
    position?: MovableObject
}

export const MovableComponent = ({ className, id, children }: MovableComponentProps) => {
    const allPositions = movableStore(state => state.positions)
    const setMovableObject = movableStore(state => state.setMovableObject)

    const pos = useMemo(() => {
        return allPositions.find(i => i.id === id) || baseMovableObject
    }, [allPositions, id])

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        const actualState = movableStore.getState()
        const pos = actualState.positions.find(i => i.id === id)

        if (!pos || !pos.triggerMove) return

        const startX = e.pageX
        const startY = e.pageY

        document.body.style.cursor = 'grab'
        document.body.style.userSelect = 'none'

        const offsetX = startX - pos.x
        const offsetY = startY - pos.y

        const newPos = { x: 0, y: 0 }

        const onMouseMove = (event: MouseEvent) => {
            const pos = actualState.positions.find(i => i.id === id)

            const newX = event.pageX - offsetX
            const newY = event.pageY - offsetY

            newPos.x = newX
            newPos.y = newY

            if (!pos?.triggerMove) return

            setMovableObject({
                id: id,
                x: newX,
                y: newY,
                isMoving: true
            })
        }

        const onMouseUp = () => {
            setMovableObject({
                id: id,
                isMoving: false,
                triggerMove: false
            })

            document.body.style.userSelect = 'auto'
            document.body.style.cursor = 'default'

            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)
        }

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
    }

    return (
        <div
            className={className}
            style={{
                transform: `translate(${pos.x}px, ${pos.y}px)`
            }}
            onMouseDown={onMouseDown}>
            {children}
        </div>
    )
}
