import { useEffect, useRef, useState } from 'react'
import { WindowController } from '../../../classes/WindowController'
import type { DesktopObject, DialogType, MousePosition } from '../../../types/config'
import {
    ContextMenuItemStyles,
    ContextMenuSpan,
    ContextMenuStyles,
    SubMenuStyles,
    WrapperSubMenuStyles
} from './ContextMenu.styles'

type ContextMenuProps = {
    handleAddWindow: (props: Partial<DesktopObject<DialogType.SHORTCUT>>) => void
    handleAddWidget: (props: Partial<DesktopObject<DialogType.WIDGET>>) => void
}

type Revers = {
    reversX: boolean
    reversY: boolean
}

export const ContextMenu = ({ handleAddWindow, handleAddWidget }: ContextMenuProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [revers, setRevers] = useState<Revers>({ reversX: false, reversY: false })
    const [pos, setPos] = useState<MousePosition>({ x: 0, y: 0 })
    const refMenu = useRef<HTMLDivElement | null>(null)
    const refWrapperMenu = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const controller = new WindowController()

        controller.addCallback(
            'contextmenu',
            e => {
                setIsOpen(true)

                let x = e.clientX
                let y = e.clientY

                let reversX = false
                let reversY = false

                if (!refMenu?.current) return
                if (!refWrapperMenu?.current) return

                const menuWidth = refMenu.current?.offsetWidth
                const menuHeight = refMenu.current?.offsetHeight

                const menuWrapperWidth = refMenu.current?.offsetWidth
                const menuWrapperHeight = refMenu.current?.offsetHeight

                if (menuWrapperWidth + menuWidth + x > window.innerWidth) {
                    reversX = true
                }

                if (menuHeight + y + menuWrapperHeight > window.innerHeight) {
                    reversY = true
                }

                if (menuWidth + x > window.innerWidth) {
                    x = x - menuWidth
                }

                if (menuHeight + y + 50 > window.innerHeight) {
                    y = y - menuHeight
                }

                setPos({ x, y })
                setRevers(item => ({ ...item, reversX, reversY }))
            },
            'open_ctx'
        )
        controller.addCallback(
            'mousedown',
            e => {
                if (refMenu.current && !refMenu?.current.contains(e.target as Node)) {
                    setIsOpen(false)
                }
            },
            'close_ctx'
        )
    }, [])

    return (
        <ContextMenuStyles ref={refMenu} $pos={pos} $isOpen={isOpen}>
            <ContextMenuItemStyles>
                <ContextMenuSpan>Create</ContextMenuSpan> <ContextMenuSpan>&#9658;</ContextMenuSpan>
                <WrapperSubMenuStyles ref={refWrapperMenu} $reversX={revers.reversX} $reversY={revers.reversY}>
                    <SubMenuStyles onClick={() => handleAddWindow({ position: { x: pos.x, y: pos.y } })}>
                        add window
                    </SubMenuStyles>
                    <SubMenuStyles onClick={() => handleAddWidget({ position: { x: pos.x, y: pos.y } })}>
                        add widget
                    </SubMenuStyles>
                </WrapperSubMenuStyles>
            </ContextMenuItemStyles>
        </ContextMenuStyles>
    )
}
