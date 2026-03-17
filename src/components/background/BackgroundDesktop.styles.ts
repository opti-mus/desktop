import styled from "styled-components";

export const BackgroundStyles = styled.div`
position: fixed;
bottom: 0;
right: 0;
z-index: -1;
margin: 20px;

label {
    cursor: pointer;
    padding: 10px;
    background-color: fcfcfc;
    border-radius: 5px;
    border: 1px solid #ccc;

    &:hover {
        border: 1px solid #949494
    }
    
    input {
        display: none;
    }
}

button {
    padding: 10px;
    background-color: fcfcfc;
    border-radius: 5px;
    border: 1px solid #ccc;
    cursor: pointer;

    &:hover {
        border: 1px solid #949494
    }
}
`