import { useEffect, useRef, useState } from 'react'
import { ContextMenuItemStyles, ContextMenuStyles, SubMenuStyles, WrapperSubMenuStyles } from './ContextMenu.styles'

type Position = {
    x: number
    y: number
}

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
    const [pos, setPos] = useState<Position>({ x: 0, y: 0 })
    const refMenu = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault()
            setIsOpen(true)

            let x = e.clientX
            let y = e.clientY

            let isReversX = false
            let isReversY = false

            if (!refMenu.current) return

            let menuWidth = refMenu.current?.offsetWidth
            let menuHeight = refMenu.current?.offsetHeight

            if (menuWidth + x > window.innerWidth) {
                x = window.innerWidth - menuWidth
                isReversX = true
            }

            if (menuHeight + y > window.innerHeight) {
                y = window.innerHeight - menuHeight
                isReversY = true
            }

            setRevers(item => ({ ...item, reversX: isReversX }))
            setRevers(item => ({ ...item, reversY: isReversY }))
            setPos({ x, y })
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

    if (!isOpen) return null

    return (
        <ContextMenuStyles ref={refMenu} $pos={pos}>
            <ContextMenuItemStyles>
                <span>Create</span> <span>&#9658;</span>
                <WrapperSubMenuStyles $reversX={revers.reversX} $reversY={revers.reversY}>
                    <SubMenuStyles onClick={handleAddWindow}>add window</SubMenuStyles>
                    <SubMenuStyles onClick={handleAddWidget}>add widjet</SubMenuStyles>
                </WrapperSubMenuStyles>
            </ContextMenuItemStyles>
            <ContextMenuItemStyles>
                <span>Create</span> <span>&#9658;</span>
                <WrapperSubMenuStyles $reversX={revers.reversX} $reversY={revers.reversY}>
                    <SubMenuStyles onClick={handleAddWindow}>add window</SubMenuStyles>
                    <SubMenuStyles onClick={handleAddWidget}>add widjet</SubMenuStyles>
                </WrapperSubMenuStyles>
            </ContextMenuItemStyles>
            <ContextMenuItemStyles>
                <span>Create</span> <span>&#9658;</span>
                <WrapperSubMenuStyles $reversX={revers.reversX} $reversY={revers.reversY}>
                    <SubMenuStyles onClick={handleAddWindow}>add window</SubMenuStyles>
                    <SubMenuStyles onClick={handleAddWidget}>add widjet</SubMenuStyles>
                </WrapperSubMenuStyles>
            </ContextMenuItemStyles>
        </ContextMenuStyles>
    )
}
