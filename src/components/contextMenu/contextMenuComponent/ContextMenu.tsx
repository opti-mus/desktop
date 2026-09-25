import { useEffect, useRef, useState } from 'react'
import {
    ContextMenuItemStyles,
    ContextMenuSpan,
    ContextMenuStyles,
    SubMenuStyles,
    WrapperSubMenuStyles
} from './ContextMenu.styles'
import type { MousePosition } from '../../../types/config'

type ContextMenuProps = {
    handleAddWindow: () => void
    handleAddWidget: () => void
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
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault()
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
        }

        const handleClickOutSide = (e: MouseEvent) => {
            if (refMenu.current && !refMenu?.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }

        window.addEventListener('contextmenu', handleContextMenu)
        window.addEventListener('click', handleClickOutSide)

        return () => {
            window.removeEventListener('contextmenu', handleContextMenu)
            window.removeEventListener('click', handleClickOutSide)
        }
    }, [])

    return (
        <ContextMenuStyles ref={refMenu} $pos={pos} $isOpen={isOpen}>
            <ContextMenuItemStyles>
                <ContextMenuSpan>Create</ContextMenuSpan> <ContextMenuSpan>&#9658;</ContextMenuSpan>
                <WrapperSubMenuStyles ref={refWrapperMenu} $reversX={revers.reversX} $reversY={revers.reversY}>
                    <SubMenuStyles onClick={handleAddWindow}>add window</SubMenuStyles>
                    <SubMenuStyles onClick={handleAddWidget}>add widjet</SubMenuStyles>
                </WrapperSubMenuStyles>
            </ContextMenuItemStyles>
            <ContextMenuItemStyles>
                <ContextMenuSpan>Create</ContextMenuSpan> <ContextMenuSpan>&#9658;</ContextMenuSpan>
                <WrapperSubMenuStyles $reversX={revers.reversX} $reversY={revers.reversY}>
                    <SubMenuStyles onClick={handleAddWindow}>add window</SubMenuStyles>
                    <SubMenuStyles onClick={handleAddWidget}>add widjet</SubMenuStyles>
                </WrapperSubMenuStyles>
            </ContextMenuItemStyles>
            <ContextMenuItemStyles>
                <ContextMenuSpan>Create</ContextMenuSpan> <ContextMenuSpan>&#9658;</ContextMenuSpan>
                <WrapperSubMenuStyles $reversX={revers.reversX} $reversY={revers.reversY}>
                    <SubMenuStyles onClick={handleAddWindow}>add window</SubMenuStyles>
                    <SubMenuStyles onClick={handleAddWidget}>add widjet</SubMenuStyles>
                </WrapperSubMenuStyles>
            </ContextMenuItemStyles>
        </ContextMenuStyles>
    )
}
