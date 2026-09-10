import { useRef } from 'react'
import { useMovableObject } from '../../hooks/useMovableObject'
import type { Shortcut } from '../../types/config'
import { ShortcutStyles } from './Shortcut.styles'

type ShortcutProps = {
    shortcut: Shortcut
}

const ShortcutComponent = ({ shortcut }: ShortcutProps) => {
    const id = shortcut.id

    const shortcutRef = useRef<HTMLDivElement>(null)
    const { startMoveHandler, isMoving } = useMovableObject({ refObject: shortcutRef })

    const handleClickShortcut = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!id || isMoving) return

        shortcut.action?.()
        startMoveHandler(e)
    }

    return (
        <ShortcutStyles ref={shortcutRef} onMouseDown={handleClickShortcut}>
            <span>{shortcut.name}</span>
        </ShortcutStyles>
    )
}

export default ShortcutComponent
