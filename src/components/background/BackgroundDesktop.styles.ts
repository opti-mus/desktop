import styled from 'styled-components'

export const BackgroundStyles = styled.div`
    position: fixed;
    right: 0;
    bottom: 50px;

    margin: 20px;

    z-index: -1;
`
export const BackgroundLabelStyles = styled.label`
    padding: 10px;

    background-color: #fcfcfc;

    border: 1px solid #ccc;
    border-radius: 5px;

    cursor: pointer;

    &:hover {
        border: 1px solid #949494;
    }`

export const BackgroundInputStyles = styled.input`
    display: none;`

export const BackgroundButtonStyles = styled.button`
    padding: 10px;

    background-color: #fcfcfc;

    border: 1px solid #ccc;
    border-radius: 5px;
    
    cursor: pointer;

    &:hover {
        border: 1px solid #949494;
    }`