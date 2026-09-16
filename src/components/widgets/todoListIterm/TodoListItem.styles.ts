import styled from "styled-components";

export const TodoListItemsStyles = styled.ul`
    list-style: none;`

export const TodoItemStyles = styled.li`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 8px;

    button {
        padding: 2px 8px;}
    `

export const TodoLabelStyles = styled.div`
    display: flex;
    align-items: flex-start;
    overflow-wrap: anywhere;
    
    label {
        margin-right: 8px;
    }
`

export const TodoItemCheckboxStyles = styled.input.attrs({ type: 'checkbox' })`
    margin-top: 3px;
    margin-right: 8px;

    &:checked + label {
        text-decoration: line-through;
    }
`;