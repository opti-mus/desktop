import { useEffect } from 'react'
import { AppStyles, WindowContainerStyles } from './App.styled'
import { WindowController } from './classes/WindowController'
import BackgroundDesktop from './components/background/BackgroundDesktop'
import ShortcutComponent from './components/shortcut/ShortcutComponent'
import StartMenu from './components/startMenu/startMenu'
import { TodoList } from './components/widgets/todoList/TodoList'
import WindowTable from './components/window/windowComponent/Window'
import { useGlobalStore } from './state/state.global'
import { DialogType, type DesktopObject } from './types/config'
import { ContextMenu } from './components/contextMenu/contextMenuComponent/ContextMenu'

function App() {
    const previewUrl = useGlobalStore.use.previewUrl()
    const windows = useGlobalStore.use.windows()
    const addWindow = useGlobalStore.use.addWindow()

    const shortcuts = useGlobalStore.use.shortcuts()
    const addShortcut = useGlobalStore.use.addShortcut()

    const mode = useGlobalStore.use.mode()
    const changeWindowProps = useGlobalStore.use.changeWindowProps()

    const handleAddWindow = () => {
        const count = windows.length + 1

        const render = () => <div>Hello World {count}</div>

        let dblClick = 0
        const dblClickDelay = 200

        const newWindow: DesktopObject<DialogType.BASE> = {
            id: crypto.randomUUID(),
            name: 'Window' + count,
            isMaximized: false,
            isOpen: false,
            type: DialogType.BASE,
            render
        }
        const shortcut: DesktopObject<DialogType.SHORTCUT> = {
            id: crypto.randomUUID(),
            name: 'Shortcut' + count,
            key: 'Ctrl+Shift+A',
            type: DialogType.SHORTCUT,
            action: () => {
                if (Date.now() - dblClick < dblClickDelay) {
                    changeWindowProps({ id: newWindow.id, isOpen: true, isActive: true })
                } else {
                    dblClick = Date.now()
                }
            },
            newWindow: newWindow.id
        }

        addShortcut(shortcut)
        addWindow(newWindow)
    }

    const handleAddWidget = () => {
        const id = crypto.randomUUID()

        const newWidget: DesktopObject<DialogType.WIDGET> = {
            id,
            type: DialogType.WIDGET,
            isMaximized: false,
            isOpen: true,
            isFocused: true,
            disabledControls: true,

            render: () => <TodoList />
        }

        addWindow(newWidget)
    }

    useEffect(() => {
        const windowController = new WindowController()

        windowController.addCallback(
            'mouseup',
            (_, controller) => {
                const store = useGlobalStore.getState()

                store.changeWindowProps({ id: controller.windowID, dimensions: controller.windowDimensions })
            },
            'save_window_dimension'
        )
        windowController.addCallback(
            'mousedown',
            (_, controller) => {
                const store = useGlobalStore.getState()

                if (controller.windowID) store.changeFocus(controller.windowID)
            },
            'save_window_dimension'
        )
    }, [])

    return (
        <WindowContainerStyles $previewUrl={previewUrl} $mode={mode}>
            <ContextMenu handleAddWindow={handleAddWindow} handleAddWidget={handleAddWidget} />
            <h1>Hello World</h1>
            <button onClick={handleAddWindow}>Add Window</button>
            <button onClick={handleAddWidget}>Add Widjet</button>
            <AppStyles>
                {shortcuts.map(shortcut => (
                    <div key={shortcut.id}>
                        <ShortcutComponent shortcut={shortcut} />
                    </div>
                ))}
            </AppStyles>
            {windows.map(w => (
                <WindowTable key={w.id} window={w} />
            ))}

            <BackgroundDesktop />
            <StartMenu />
        </WindowContainerStyles>
    )
}

export default App
