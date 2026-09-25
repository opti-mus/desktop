import styled from 'styled-components'

export const TodoListStyles = styled.div`
    width: 100%;
    height: 100%;

    position: sticky;
    top: 0;

    padding: 12px 20px;

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
        min-width: 100px;
        background-color: rgba(255, 255, 255, 0.8);
    }

    button {
        padding: 0px 12px;
        height: 40px;
        border: 1px solid #d3d3d3;
        border-radius: 5px;
        background-color: #e4e3e3;
        transition: all 0.3s ease-in-out;

        &:hover {
            border-color: #8c8c8c;
            background-color: #e4e3e3;
        }
    }
`
