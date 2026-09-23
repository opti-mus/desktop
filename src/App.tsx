import { useEffect } from 'react'
import { AppStyles, WindowContainerStyles } from './App.styled'
import { WindowController } from './classes/WindowController'
import BackgroundDesktop from './components/background/BackgroundDesktop'
import ShortcutComponent from './components/shortcut/ShortcutComponent'
import StartMenu from './components/startMenu/startMenu'
import WindowTable from './components/window/windowComponent/Window'
import { useGlobalStore } from './state/state.global'
import type { Shortcut, WindowTemplate } from './types/config'

function App() {
    const previewUrl = useGlobalStore.use.previewUrl()
    const addShortcut = useGlobalStore.use.addShortcut()
    const windows = useGlobalStore.use.windows()
    const shortcuts = useGlobalStore.use.shortcuts()
    const mode = useGlobalStore.use.mode()
    const addWindow = useGlobalStore.use.addWindow()
    const changeWindowProps = useGlobalStore.use.changeWindowProps()

    const handleAddWindow = () => {
        const count = windows.length + 1

        const render = () => <div>Hello World {count}</div>

        const newWindow: WindowTemplate = {
            id: crypto.randomUUID(),
            name: 'Window' + count,
            isMaximized: false,
            isOpen: false,
            render
        }
        const shortcut: Shortcut = {
            id: crypto.randomUUID(),
            name: 'Shortcut' + count,
            key: 'Ctrl+Shift+A',
            action: () => {
                console.log('Shortcut pressed')
                changeWindowProps({ id: newWindow.id, isOpen: true, isFocused: true, isActive: true })
            },
            newWindow: newWindow.id
        }

        addShortcut(shortcut)
        addWindow(newWindow)
    }

    useEffect(() => {
        const windowController = new WindowController()
        windowController.addCallback(
            'mouseup',
            (e, controller) => {
                const store = useGlobalStore.getState()

                store.changeWindowProps({ id: controller.windowID, dimensions: controller.windowDimensions })
            },
            'save_window_dimension'
        )
    }, [])

    return (
        <WindowContainerStyles $previewUrl={previewUrl} $mode={mode}>
            <h1>Hello World</h1>
            <button onClick={handleAddWindow}>Add Window</button>
            <AppStyles>
                {shortcuts.map(shortcut => (
                    <div key={shortcut.id}>
                        <ShortcutComponent shortcut={shortcut} />
                    </div>
                ))}
            </AppStyles>
            {windows.map(w => (
                <div key={w.id}>
                    <WindowTable window={w} />
                </div>
            ))}
            <BackgroundDesktop />
            <StartMenu />
        </WindowContainerStyles>
    )
}

export default App
