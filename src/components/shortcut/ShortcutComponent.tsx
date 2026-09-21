import { useMovableObject } from '../../hooks/useMovableObject'
import { useGlobalStore } from '../../state/state.global'
import type { Shortcut } from '../../types/config'
import { ShortcutStyles } from './Shortcut.styles'

type ShortcutProps = {
    shortcut: Shortcut
}

const ShortcutComponent = ({ shortcut }: ShortcutProps) => {
    const { id } = shortcut

    const changeShortcutProps = useGlobalStore.use.changeShortcutProps()

    const { startMoveHandler, isMoving, position: newPosition, refObject } = useMovableObject({ moveObject: shortcut })

    const handleClickShortcut = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!id || isMoving) return

        shortcut.action?.()
        startMoveHandler(e)
    }

    const savePositionHandler = () => {
        changeShortcutProps({ id, position: newPosition })
    }

    return (
        <ShortcutStyles ref={refObject} onMouseDown={handleClickShortcut} onPointerUp={savePositionHandler}>
            <span>{shortcut.name}</span>
        </ShortcutStyles>
    )
}

export default ShortcutComponent
