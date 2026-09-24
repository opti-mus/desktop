import { ContextMenuItemStyles, SubMenuStyles, WrapperSubMenuStyles } from './ContextMenuItem.Styles'

// Може добавлю
export const ContextMenuItem = () => {
    return (
        <ContextMenuItemStyles>
            <span>Sort</span> <span>&#9658;</span>
            <WrapperSubMenuStyles>
                <SubMenuStyles>name</SubMenuStyles>
                <SubMenuStyles>data</SubMenuStyles>
            </WrapperSubMenuStyles>
        </ContextMenuItemStyles>
    )
}
