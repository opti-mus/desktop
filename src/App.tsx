import { AppStyles, WindowContainerStyles } from './App.styled'
import BackgroundDesktop from './components/background/BackgroundDesktop'
import ShortcutComponent from './components/shortcut/ShortcutComponent'
import WindowTable from './components/window/windowComponent/Window'
import { movableStore } from './state/MovableSilce'
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

    const addMovableObject = movableStore(state => state.addMovableObject)

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
                changeWindowProps({ id: newWindow.id, isOpen: true, isFocused: true })
            },
            newWindow: newWindow.id
        }

        addShortcut(shortcut)
        addWindow(newWindow)
        addMovableObject({ id: shortcut.id, x: 0, y: 0 })
        addMovableObject({ id: newWindow.id, x: 0, y: 0 })
    }

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
        </WindowContainerStyles>
    )
}

export default App
