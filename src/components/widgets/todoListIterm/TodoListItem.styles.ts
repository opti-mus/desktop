import styled from 'styled-components'

type TodoTextInfo = {
    $textInfo: string
}

export const TodoListItemsStyles = styled.ul`
    list-style: none;
`

export const TodoItemStyles = styled.li`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 8px;
    width: 100%;
`

export const TodoLabelStyles = styled.div`
    display: flex;
    align-items: center;
    overflow: hidden;

    label {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
`
export const TodoItemButtons = styled.div`
    display: flex;
    gap: 5px;
`
export const TodoItemSpan = styled.span<TodoTextInfo>`
    padding: 3px;
    cursor: pointer;
    position: relative;

    &::after {
        content: '${({ $textInfo }) => $textInfo}';
        position: absolute;
        bottom: 0;
        right: 0;
        opacity: 0;
        visibility: hidden;

        padding: 8px 12px;

        background-color: #f4f4f4;
        width: 300px;
        overflow-wrap: break-word;

        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

        transition:
            bottom 0.3s ease-in-out,
            right 0.3s ease-in-out,
            opacity 0.3s ease-in-out;

        z-index: 100;
    }

    &:hover::after {
        bottom: 100%;
        right: 100%;
        opacity: 1;
        visibility: visible;
    }
`

export const TodoItemButton = styled.button`
    padding: 2px 8px;
`

export const TodoItemCheckboxStyles = styled.input.attrs({ type: 'checkbox' })`
    margin-top: 3px;
    margin-right: 8px;

    &:checked + label {
        text-decoration: line-through;
    }
`
