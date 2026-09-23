import { useMemo } from 'react'
import { useGlobalStore } from '../../../state/state.global'
import type { Shortcut } from '../../../types/config'
import { StartMenuElement } from './startMenuItem.styles'

type StartMenuItemType = {
    shortcut: Shortcut
}
export const StartMenuItem = ({ shortcut }: StartMenuItemType) => {
    const windows = useGlobalStore.use.windows()
    const changeWindowProps = useGlobalStore.use.changeWindowProps()

    const currentWindow = useMemo(() => {
        return windows.find(w => w.id === shortcut.newWindow)
    }, [windows, shortcut])

    const shortcutHandler = () => {
        if (!currentWindow || !currentWindow?.isActive) return

        changeWindowProps({
            id: currentWindow?.id,
            isMinimized: !currentWindow.isMinimized,
            isOpen: !currentWindow.isOpen
        })
    }

    return (
        <StartMenuElement $isOpen={currentWindow?.isOpen} $isActive={currentWindow?.isActive} onClick={shortcutHandler}>
            {shortcut.name}
        </StartMenuElement>
    )
}
