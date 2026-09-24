import styled from 'styled-components'

export const WrapperSubMenuStyles = styled.div`
    display: none;
    flex-direction: column;
    width: 250px;

    border: 1px solid #ccc;
    border-radius: 8px;

    position: absolute;
    left: 100%;
    top: 0;
`

export const ContextMenuItemStyles = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 8px;

    border-radius: 5px;

    &:hover {
        background-color: #e6e6e6;
    }

    &:hover ${WrapperSubMenuStyles} {
        display: flex;
    }
`
export const SubMenuStyles = styled.div`
    padding: 5px 8px;

    &:hover {
        background-color: #e6e6e6;
    }
`
