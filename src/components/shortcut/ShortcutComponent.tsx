import { useEffect, useRef } from 'react'
import { WindowController } from '../../classes/WindowController'
import { useGlobalStore } from '../../state/state.global'
import type { Shortcut } from '../../types/config'
import { ShortcutStyles } from './Shortcut.styles'

type ShortcutProps = {
    shortcut: Shortcut
}

const ShortcutComponent = ({ shortcut }: ShortcutProps) => {
    const { id, isHovered } = shortcut

    const changeShortcutProps = useGlobalStore.use.changeShortcutProps()

    const refObject = useRef<HTMLDivElement | null>(null)

    const handleClickShortcut = () => {
        const controller = new WindowController()
        controller.isDragging = true

        shortcut.action?.()
    }

    const savePositionHandler = () => {
        const controller = new WindowController()
        const position = controller.moveData.get(id)

        controller.selectionModule.recalcSelections()

        if (position && !controller.selectionModule.selections.size) {
            changeShortcutProps({ id, position })
        }
        if (controller.selectionModule.selections.size) {
            controller.selectionModule.selections.forEach((item, inx) => {
                changeShortcutProps({ id: inx, position: { x: item.x, y: item.y } })
            })
        }
    }

    useEffect(() => {
        new WindowController().applyDimensions(refObject.current, shortcut)
    }, [])

    return (
        <ShortcutStyles
            ref={refObject}
            data-window={id}
            data-shortcut={id}
            $isHovered={isHovered}
            onMouseDown={handleClickShortcut}
            onPointerUp={savePositionHandler}
            id={id}>
            <span>{shortcut.name}</span>
        </ShortcutStyles>
    )
}

export default ShortcutComponent
