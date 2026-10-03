import { useEffect, useRef, useState } from 'react'
import { WindowController } from '../../../classes/WindowController'
import { useGlobalStore } from '../../../state/state.global'
import { DialogType, type DesktopObject, type MousePosition } from '../../../types/config'
import { allowedTypes, handleChangeBackground } from '../../background/background.utils'
import {
    ContextMenuInputFile,
    ContextMenuItemStyles,
    ContextMenuSpan,
    ContextMenuStyles,
    MenuItemStyles,
    SubMenuStyles,
    WrapperSubMenuStyles
} from './ContextMenu.styles'

type ContextMenuProps = {
    handleAddWindow: (props: Partial<DesktopObject<DialogType.SHORTCUT>>) => void
    handleAddWidget: (props: Partial<DesktopObject<DialogType.WIDGET>>) => void
    changeBackground?: () => void
}

type Revers = {
    reverseMenuX: boolean
    reverseMenuY: boolean
}

export const ContextMenu = ({ handleAddWindow, handleAddWidget }: ContextMenuProps) => {
    const closeWindow = useGlobalStore.use.closeWindow()
    const closeShortcut = useGlobalStore.use.closeShortcut()

    const { setBackground } = useGlobalStore()

    const refMenu = useRef<HTMLDivElement | null>(null)
    const refWrapperMenu = useRef<HTMLDivElement | null>(null)
    const refInputFile = useRef<HTMLInputElement | null>(null)

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [reverseMenu, setReverseMenu] = useState<Revers>({ reverseMenuX: false, reverseMenuY: false })
    const [windowType, setWindowType] = useState<DialogType | ''>('')
    const [menuPosition, setMenuPosition] = useState<MousePosition>({ x: 0, y: 0 })
    const [targetID, setTargetID] = useState<string>('')

    const closeMenu = () => {
        setIsMenuOpen(false)
        setWindowType('')
    }
    const closeDesktopItem = () => {
        switch (windowType) {
            case DialogType.WIDGET:
            case DialogType.BASE:
                closeWindow(targetID)
                break
            case DialogType.SHORTCUT:
                closeShortcut(targetID)
                break
        }
        closeMenu()
    }
    const renderContextMenu = () => {
        switch (windowType) {
            case DialogType.WIDGET:
            case DialogType.SHORTCUT:
            case DialogType.BASE:
                return (
                    <MenuItemStyles onClick={closeDesktopItem}>
                        <ContextMenuSpan>close</ContextMenuSpan>
                    </MenuItemStyles>
                )
            default:
                return (
                    <>
                        <MenuItemStyles data-create $isMenuOpen={isMenuOpen}>
                            <ContextMenuSpan>Create</ContextMenuSpan> <ContextMenuSpan>&#9658;</ContextMenuSpan>
                            <WrapperSubMenuStyles
                                ref={refWrapperMenu}
                                $reverseMenuX={reverseMenu.reverseMenuX}
                                $reverseMenuY={reverseMenu.reverseMenuY}>
                                <SubMenuStyles
                                    onClick={() => {
                                        handleAddWindow({ position: { x: menuPosition.x, y: menuPosition.y } })
                                        setIsMenuOpen(false)
                                    }}>
                                    add shortcut
                                </SubMenuStyles>

                                <SubMenuStyles
                                    onClick={() => {
                                        handleAddWidget({ position: { x: menuPosition.x, y: menuPosition.y } })
                                        setIsMenuOpen(false)
                                    }}>
                                    add widget
                                </SubMenuStyles>
                            </WrapperSubMenuStyles>
                        </MenuItemStyles>
                        <MenuItemStyles>
                            <ContextMenuSpan>
                                <ContextMenuInputFile
                                    ref={refInputFile}
                                    type="file"
                                    id="background-desktop"
                                    name="background"
                                    accept={allowedTypes.join(', ')}
                                    onChange={e => {
                                        handleChangeBackground(e, refInputFile, setBackground)
                                        setIsMenuOpen(false)
                                    }}
                                />
                                Change Background
                            </ContextMenuSpan>
                        </MenuItemStyles>
                    </>
                )
        }
    }

    useEffect(() => {
        const controller = new WindowController()

        controller.addCallback(
            'contextmenu',
            (e, ctrl) => {
                const windowDOM = ctrl.getWindowDOM(e)
                const type = windowDOM?.dataset?.type as DialogType | undefined

                setIsMenuOpen(true)

                if (type) setWindowType(type)
                if (windowDOM?.id) setTargetID(windowDOM?.id)

                let x = e.clientX
                let y = e.clientY

                let reverseMenuX = false
                let reverseMenuY = false

                if (!refMenu?.current) return
                if (!refWrapperMenu?.current) return

                const menuWidth = refMenu.current?.offsetWidth
                const menuHeight = refMenu.current?.offsetHeight

                const menuWrapperWidth = refWrapperMenu.current?.offsetWidth
                const menuWrapperHeight = refWrapperMenu.current?.offsetHeight

                if (menuWrapperWidth + menuWidth + x > window.innerWidth) {
                    reverseMenuX = true
                }

                if (menuHeight + y + menuWrapperHeight > window.innerHeight) {
                    reverseMenuY = true
                }

                if (menuWidth + x > window.innerWidth) {
                    x = x - menuWidth
                }

                if (menuHeight + y + 50 > window.innerHeight) {
                    y = y - menuHeight
                }

                setMenuPosition({ x, y })
                setReverseMenu(item => ({ ...item, reverseMenuX, reverseMenuY }))
            },
            'open_ctx'
        )
        controller.addCallback(
            'mousedown',
            e => {
                if (refMenu.current && !refMenu?.current.contains(e.target as Node)) {
                    setIsMenuOpen(false)
                    setWindowType('')
                }
            },
            'close_ctx'
        )
    }, [])

    return (
        <ContextMenuStyles ref={refMenu} $menuPosition={menuPosition} $isMenuOpen={isMenuOpen}>
            <ContextMenuItemStyles>{renderContextMenu()}</ContextMenuItemStyles>
        </ContextMenuStyles>
    )
}
