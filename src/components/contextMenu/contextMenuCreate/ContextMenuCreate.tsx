import { SubMenuStyles } from '../contextMenuComponent/ContextMenu.styles'

type ContextMenuCreateProps = {
    position: { x: number; y: number }
    handleAddWindow: (data: { position: { x: number; y: number } }) => void
    handleAddWidget: (data: { position: { x: number; y: number } }) => void
    setIsMenuOpen: (isOpen: boolean) => void
}

export const ContextMenuCreate = ({
    position,
    handleAddWindow,
    handleAddWidget,
    setIsMenuOpen
}: ContextMenuCreateProps) => {
    return (
        <>
            <SubMenuStyles
                onClick={() => {
                    handleAddWindow({ position: { x: position.x, y: position.y } })
                    setIsMenuOpen(false)
                }}>
                add shortcut
            </SubMenuStyles>

            <SubMenuStyles
                onClick={() => {
                    handleAddWidget({ position: { x: position.x, y: position.y } })
                    setIsMenuOpen(false)
                }}>
                add widget
            </SubMenuStyles>
        </>
    )
}
