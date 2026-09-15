import styled from "styled-components";

export const TodoListStyles = styled.div`
    position: absolute;
    width: 500px;
    min-height: 400px;
    background-color: rgba(199, 199, 199, 0.4);
    border: 1px solid #9e9e9e;
    border-radius: 8px;
    padding: 16px;
    z-index: 1000;

    h2 {
        margin-top: 0;
        text-align: center;
        }
`
export const TodoTaskStyles = styled.div`
    display: flex;
    margin-top: 16px;
    gap: 8px;
    justify-content: center;

    input {
        height: 40px;
        width: 300px;
        background-color: rgba(255, 255, 255, 0.8);
    }

    button {
        padding: 0px 12px;
        height: 40px;
        border: 1px solid transparent ;
        border-radius: 5px;
        transition: all .3s ease-in-out;

    &:hover {
        border-color: #8c8c8c;
        background-color: #e4e3e3;
        }
    }
`