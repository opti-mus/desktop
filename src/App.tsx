import { useEffect } from 'react'
import { AppStyles, WindowContainerStyles } from './App.styled'
import BackgroundDesktop from './components/background/BackgroundDesktop'
import ShortcutComponent from './components/shortcut/ShortcutComponent'
import { TodoList } from './components/widgets/todoList/TodoList'
import WindowTable from './components/window/windowComponent/Window'
import { useResizeWindow } from './hooks/useResizeWindow'
import { useBlockStore } from './state/BlockStoreSlice'
import { useGlobalStore } from './state/state.global'
import type { Shortcut, Widjet, WindowTemplate } from './types/config'
import { WidjetComponent } from './components/widgets/widjetComponent/WidjetComponent'

function App() {
    const previewUrl = useGlobalStore.use.previewUrl()
    const windows = useGlobalStore.use.windows()
    const addWindow = useGlobalStore.use.addWindow()

    const shortcuts = useGlobalStore.use.shortcuts()
    const addShortcut = useGlobalStore.use.addShortcut()

    const widjets = useGlobalStore.use.widjets()
    const addWidjet = useGlobalStore.use.addWidjet()

    const mode = useGlobalStore.use.mode()
    const changeWindowProps = useGlobalStore.use.changeWindowProps()

    const bringToFront = useBlockStore(state => state.bringToFront)
    useResizeWindow()

    const handleAddWindow = () => {
        const count = windows.length + 1

        const render = () => <div>Hello World {count}</div>

        let dblClick = 0;
        const dblClickDelay = 200;

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
                if (Date.now() - dblClick < dblClickDelay) {
                    changeWindowProps({ id: newWindow.id, isOpen: true, isFocused: true })
                } else {
                    dblClick = Date.now();
                }
            },
            newWindow: newWindow.id
        }

        addShortcut(shortcut)
        addWindow(newWindow)
    }

    const handleAddWidjet = () => {
        const count = widjets.length + 1;
        const id = crypto.randomUUID();

        const newWidjet: Widjet = {
            id,
            name: `Widjet: ${count}`,

            isMaximized: false,
            isOpen: true,
            isFocused: true,

            render: () => <TodoList id={id} />
        }

        addWidjet(newWidjet)
    }

    useEffect(() => {
        const handleGlobalClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            const closestElement = target.closest('[data-index]') as HTMLElement

            if (closestElement && closestElement?.dataset.index) {
                bringToFront(closestElement.dataset.index)
            }
        }

        document.addEventListener('mousedown', handleGlobalClick)

        return () => document.removeEventListener('mousedown', handleGlobalClick)
    }, [bringToFront])

    return (
        <WindowContainerStyles $previewUrl={previewUrl} $mode={mode}>
            <h1>Hello World</h1>
            <button onClick={handleAddWindow}>Add Window</button>
            <button onClick={handleAddWidjet}>Add Widjet</button>
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
            {widjets.map(w => (
                <WidjetComponent key={w.id} widjet={w} />
            ))}

            <BackgroundDesktop />
        </WindowContainerStyles>
    )
}

export default App
