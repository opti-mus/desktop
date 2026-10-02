import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { AppButtonStyles, AppStyles, WindowContainerStyles, WindowContainerTitle } from './App.styled'
import { WindowController } from './classes/WindowController'
import BackgroundDesktop from './components/background/BackgroundDesktop'
import { ContextMenu } from './components/contextMenu/contextMenuComponent/ContextMenu'
import ShortcutComponent from './components/shortcut/ShortcutComponent'
import StartMenu from './components/startMenu/startMenu'
import { TodoList } from './components/widgets/todoList/TodoList'
import WindowTable from './components/window/windowComponent/Window'
import { useConfig } from './hooks/api/useConfig'
import { useInitListeners } from './hooks/useInitListener'
import { useGlobalStore } from './state/state.global'
import { DialogType, type DesktopObject } from './types/config'

function App() {
    const previewUrl = useGlobalStore.use.previewUrl()
    const windows = useGlobalStore.use.windows()
    const addWindow = useGlobalStore.use.addWindow()

    const shortcuts = useGlobalStore.use.shortcuts()
    const setShortcuts = useGlobalStore.use.setShortcuts()

    const mode = useGlobalStore.use.mode()
    const changeWindowProps = useGlobalStore.use.changeWindowProps()

    const queryClient = useQueryClient()
    const { createConfig, getAllConfigs } = useConfig()
    useInitListeners()

    const { isSuccess, data } = useQuery({
        queryKey: ['config'],
        queryFn: async () => await getAllConfigs()
    })

    const { mutate: createConfigMt } = useMutation({
        mutationFn: createConfig,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['config'] })
        }
    })

    useEffect(() => {
        if (isSuccess && data?.data) {
            setShortcuts(data?.data)
        }
    }, [isSuccess, data])

    const handleAddWindow = async (props?: Partial<DesktopObject<DialogType.SHORTCUT>>) => {
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
        addWindow(newWindow)

        createConfigMt(shortcut)
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

    useEffect(() => {
        const controller = new WindowController()

        controller.init()

        return () => controller.destroy()
    }, [])

    return (
        <WindowContainerStyles $previewUrl={previewUrl} $mode={mode}>
            <ContextMenu handleAddWindow={handleAddWindow} handleAddWidget={handleAddWidget} />
            <WindowContainerTitle>Hello World</WindowContainerTitle>
            <AppButtonStyles onClick={() => handleAddWindow()}>DOOOM!!!</AppButtonStyles>
            <AppButtonStyles onClick={() => handleAddWidget()}>Add Widget</AppButtonStyles>
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
