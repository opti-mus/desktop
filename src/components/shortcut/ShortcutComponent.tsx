import { useEffect, useRef } from 'react'
import { WindowController } from '../../classes/WindowController'
import { useGlobalStore } from '../../state/state.global'
import type { Shortcut } from '../../types/config'
import { ShortcutStyles } from './Shortcut.styles'

type ShortcutProps = {
    shortcut: Shortcut
}

const ShortcutComponent = ({ shortcut }: ShortcutProps) => {
    const id = shortcut.id

    const changeShortcutProps = useGlobalStore.use.changeShortcutProps()

    const refObject = useRef<HTMLDivElement | null>(null)

    const handleClickShortcut = (e: React.MouseEvent<HTMLDivElement>) => {
        new WindowController().isDragging = true
        shortcut.action?.()
    }

    const savePositionHandler = () => {
        const controller = new WindowController()
        const position = controller.moveData.get(id)

        if (position) {
            changeShortcutProps({ id, position })
        }
    }

    useEffect(() => {
        new WindowController().applyDimensions(refObject.current, shortcut)
    }, [])

    return (
        <ShortcutStyles
            ref={refObject}
            data-window={id}
            onMouseDown={handleClickShortcut}
            onPointerUp={savePositionHandler}
            id={id}>
            <span>{shortcut.name}</span>
        </ShortcutStyles>
    )
}

export default ShortcutComponent
