import styled from 'styled-components'

type ContextMenuProps = {
    $pos: ContextmenuPos
    $isOpen: boolean
}

type WrapperSubMenu = {
    $reversX: boolean
    $reversY: boolean
}

type ContextmenuPos = {
    x: number
    y: number
}

type MenuItem = {
    $isOpen?: boolean
}

export const ContextMenuStyles = styled.div<ContextMenuProps>`
    display: flex;
    flex-direction: column;

    position: absolute;

    transform: translate(${({ $pos }) => $pos.x}px, ${({ $pos }) => $pos.y}px);

    visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};

    background-color: #fefefe;

    border: 1px solid #ccc;
    border-radius: 8px;

    padding: 15px 0px;
    width: 250px;

    z-index: 10000;
`

export const WrapperSubMenuStyles = styled.div<WrapperSubMenu>`
    display: flex;
    flex-direction: column;

    width: 250px;

    background-color: #ffffff;

    border: 1px solid #ccc;
    border-radius: 8px;

    position: absolute;

    top: ${({ $reversY }) => ($reversY ? '-100%' : '0')};
    left: ${({ $reversX }) => ($reversX ? '-100%' : '100%')};

    visibility: hidden;
    opacity: 0;
`

export const SubMenuStyles = styled.div`
    padding: 5px 8px;

    border-radius: 8px;

    &:not(:last-child) {
        border-bottom: 1px solid #ccc;
    }

    &:hover {
        background-color: #e6e6e6;
    }
`

export const ContextMenuItemStyles = styled.div`
    position: relative;

    user-select: none;
    border-radius: 5px;
`

export const MenuItemStyles = styled.div<MenuItem>`
    position: relative;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 5px 8px;
    border-bottom: 1px solid #ccc;

    &:last-child {
        border-bottom: 1px solid transparent;
    }

    &:hover {
        background-color: #e6e6e6;
    }

    &[data-create]:hover ${WrapperSubMenuStyles} {
        display: flex;

        visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
        opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    }
`

export const ContextMenuSpan = styled.span``
