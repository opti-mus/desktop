import styled from 'styled-components'
import { TodoItemStyle } from '../todoItemInfo/TodoItemInfo.styles'

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

    &:hover ~ ${TodoItemStyle} {
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
