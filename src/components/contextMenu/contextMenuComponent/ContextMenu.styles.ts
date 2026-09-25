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

export const WrapperSubMenuStyles = styled.div<WrapperSubMenu>`
    display: none;
    flex-direction: column;
    width: 250px;

    background-color: #ffffff;

    border: 1px solid #ccc;
    border-radius: 8px;

    position: absolute;
    top: ${({ $reversY }) => ($reversY ? '-100%' : '0')};
    left: ${({ $reversX }) => ($reversX ? '-100%' : '100%')};
`

export const ContextMenuItemStyles = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 5px 8px;
    user-select: none;

    border-radius: 5px;

    border-bottom: 1px solid #ccc;

    &:hover {
        background-color: #e6e6e6;
    }

    &:hover ${WrapperSubMenuStyles} {
        display: flex;
    }
`
export const ContextMenuSpan = styled.span``
