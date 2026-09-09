import { useMemo } from 'react'
import { baseMovableObject, movableStore } from '../../state/MovableSilce'
import type { Shortcut } from '../../types/config'
import { MovableComponent } from '../movableComponent/MovableComponent'
import { ShortcutStyles } from './Shortcut.styles'

type ShortcutProps = {
    shortcut: Shortcut
}

const ShortcutComponent = ({ shortcut }: ShortcutProps) => {
    const id = shortcut.id

    const allPositions = movableStore(state => state.positions)
    const setMovableObject = movableStore(state => state.setMovableObject)

    const pos = useMemo(() => {
        return allPositions.find(i => i.id === id) || baseMovableObject
    }, [allPositions, id])

    const handleClickShortcut = () => {
        setMovableObject({ id, triggerMove: true })

        if (!id || pos?.isMoving) return

        shortcut.action?.()
    }

    return (
        <MovableComponent id={id}>
            <ShortcutStyles onMouseDown={handleClickShortcut}>
                <span>{shortcut.name}</span>
            </ShortcutStyles>
        </MovableComponent>
    )
}

export default ShortcutComponent
