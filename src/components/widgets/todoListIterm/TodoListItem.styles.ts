import styled from 'styled-components'

export const TodoListItemsStyles = styled.ul`
    width: calc(100% - 5px);
    height: calc(100% - 96px);
    overflow-y: auto;
    list-style: none;
    scrollbar-gutter: stable;
`

export const TodoItemStyles = styled.li`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 8px;
    width: 100%;
`

export const TodoItemSpanStyle = styled.span`
    position: absolute;
    top: 0px;
    right: 88px;

    max-width: 300px;
    overflow-wrap: break-word;
    user-select: text;
    scrollbar-width: thin;

    padding: 5px 8px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: white;

    opacity: 0;
    visibility: hidden;

    transition:
        opacity 0.3s ease-in-out,
        visibility 0.3s ease-in-out;

    z-index: 100;

    &:hover {
        opacity: 1;
        visibility: visible;
    }
`

export const TodoLabelGroupStyles = styled.div`
    display: flex;
    align-items: center;
    overflow: hidden;
`

export const TodoLabelStyles = styled.label`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`

export const TodoItemButtons = styled.div`
    position: relative;
    display: flex;
    gap: 5px;
`
export const TodoItemSpan = styled.span`
    padding: 3px;
    cursor: pointer;
    position: relative;

    &:hover ~ ${TodoItemSpanStyle} {
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
