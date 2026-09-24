import styled from 'styled-components'

type ContextMenuProps = {
    $pos: ContextmenuPos
}

type WrapperSubMenu = {
    // $reversX: boolean
    // $reversY: boolean
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

    background-color: #fefefe;

    border: 1px solid #ccc;
    border-radius: 8px;

    padding: 15px 0px;
    width: 250px;
`

export const SubMenuStyles = styled.div`
    padding: 5px 8px;

    &:hover {
        background-color: #e6e6e6;
    }
`

export const WrapperSubMenuStyles = styled.div<WrapperSubMenu>`
    display: none;
    flex-direction: column;
    width: 250px;

    border: 1px solid #ccc;
    border-radius: 8px;

    position: absolute;
    /* top: ${$reversY => ($reversY ? '0px' : '100%')};
    left: ${$reversX => ($reversX ? '0px' : '100%')}; */
    top: 0;
    left: 100%;
`

export const ContextMenuItemStyles = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 8px;
    user-select: none;

    border-radius: 5px;

    &:hover {
        background-color: #e6e6e6;
    }

    &:hover ${WrapperSubMenuStyles} {
        display: flex;
    }
`
