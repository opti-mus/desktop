import styled from 'styled-components'

export const TodoItemStyle = styled.span`
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
