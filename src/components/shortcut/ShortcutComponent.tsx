import { useEffect, useRef } from 'react'
import { WindowController } from '../../classes/WindowController'
import { useConfig } from '../../hooks/api/useConfig'
import { useGlobalStore } from '../../state/state.global'
import type { Shortcut } from '../../types/config'
import { ShortcutIcon, ShortcutStyles } from './Shortcut.styles'

type ShortcutProps = {
    shortcut: Shortcut
}

const ShortcutComponent = ({ shortcut }: ShortcutProps) => {
    const { id, isHovered } = shortcut

    const changeShortcutProps = useGlobalStore.use.changeShortcutProps()
    const { updateConfig } = useConfig()

    const refObject = useRef<HTMLDivElement | null>(null)

    const handleClickShortcut = () => {
        const controller = new WindowController()
        controller.isDragging = true

        shortcut.action?.()
    }

    const savePositionHandler = async () => {
        const controller = new WindowController()
        const position = controller.moveData.get(id)
        const store = useGlobalStore.getState()
        const config = store.shortcuts.find(item => item.id === id)

        controller.selectionModule.recalcSelections()

        if (position && !controller.selectionModule.selections.size) {
            changeShortcutProps({ id, position })

            if (config) await updateConfig({ ...config, position })
        }
        if (controller.selectionModule.selections.size) {
            for (const item of controller.selectionModule.selections) {
                const [id, { x, y }] = item

                changeShortcutProps({ id, position: { x, y } })
                await updateConfig({ id, position: { x, y } })
            }
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
            {shortcut?.name ? <span>{shortcut.name}</span> : null}
            {shortcut?.icon ? <ShortcutIcon $src={shortcut.icon} /> : null}
        </ShortcutStyles>
    )
}

export default ShortcutComponent
