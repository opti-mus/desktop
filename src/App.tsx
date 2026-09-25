import { AppStyles, WindowContainerStyles } from './App.styled'
import BackgroundDesktop from './components/background/BackgroundDesktop'
import { ContextMenu } from './components/contextMenu/contextMenuComponent/ContextMenu'
import ShortcutComponent from './components/shortcut/ShortcutComponent'
import StartMenu from './components/startMenu/startMenu'
import { TodoList } from './components/widgets/todoList/TodoList'
import WindowTable from './components/window/windowComponent/Window'
import { useInitListeners } from './hooks/useInitListener'
import { useGlobalStore } from './state/state.global'
import { DialogType, type DesktopObject } from './types/config'

function App() {
    const previewUrl = useGlobalStore.use.previewUrl()
    const windows = useGlobalStore.use.windows()
    const addWindow = useGlobalStore.use.addWindow()

    const shortcuts = useGlobalStore.use.shortcuts()
    const addShortcut = useGlobalStore.use.addShortcut()

    const mode = useGlobalStore.use.mode()
    const changeWindowProps = useGlobalStore.use.changeWindowProps()

    useInitListeners()

    const handleAddWindow = (props?: Partial<DesktopObject<DialogType.SHORTCUT>>) => {
        const count = windows.length + 1

        const render = () => (
            <div style={{ width: '100%', height: '100%' }}>
                <iframe
                    width={'100%'}
                    height={'100%'}
                    id="gameIframe"
                    title="Doom 1"
                    data-src="https://db.duckmath.org/html/doom_1/index.html"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-pointer-lock allow-orientation-lock allow-top-navigation"
                    src="https://db.duckmath.org/html/doom_1/index.html"></iframe>
            </div>
        )

        let dblClick = 0
        const dblClickDelay = 200

        const newWindow: DesktopObject<DialogType.BASE> = {
            id: crypto.randomUUID(),
            name: 'DOOOM',
            isMaximized: false,
            isOpen: false,
            type: DialogType.BASE,
            render
        }
        const shortcut: DesktopObject<DialogType.SHORTCUT> = {
            id: crypto.randomUUID(),
            key: 'Ctrl+Shift+A',
            type: DialogType.SHORTCUT,
            icon: 'src/assets/doom.webp',
            position: { x: 0, y: 0 },
            ...props,
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

    const handleAddWidget = (props?: Partial<DesktopObject<DialogType.WIDGET>>) => {
        const id = crypto.randomUUID()

        const newWidget: DesktopObject<DialogType.WIDGET> = {
            id,
            type: DialogType.WIDGET,
            isMaximized: false,
            isOpen: true,
            isFocused: true,
            disabledControls: true,
            ...props,

            render: () => <TodoList />
        }

        addWindow(newWidget)
    }

    return (
        <WindowContainerStyles $previewUrl={previewUrl} $mode={mode}>
            <ContextMenu handleAddWindow={handleAddWindow} handleAddWidget={handleAddWidget} />
            <h1>Hello World</h1>
            <button onClick={() => handleAddWindow()}>DOOOM!!!</button>
            <button onClick={() => handleAddWidget()}>Add Widget</button>
            <AppStyles>
                {shortcuts.map(shortcut => (
                    <div key={shortcut.id}>
                        <ShortcutComponent shortcut={shortcut} />
                    </div>
                ))}
            </AppStyles>
            {windows.map(w => {
                if (!w.isOpen) return
                return <WindowTable key={w.id} window={w} />
            })}

            <BackgroundDesktop />
            <StartMenu />
        </WindowContainerStyles>
    )
}

export default App
