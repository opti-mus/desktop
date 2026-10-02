import styled from 'styled-components'

export const StartMenuPanel = styled.div`
    position: absolute;
    bottom: 0;

    background-color: rgba(0, 0, 0, 0.3);

    display: flex;
    align-items: center;
    justify-content: center;

    height: 3rem;
    width: 100%;
`
export const StartMenuWrapper = styled.div`
    display: flex;
    align-items: center;

    gap: 1rem;
    height: 100%;
`
export const LogoutButtonStyles = styled.button`
    position: absolute;
    right: 5%;

    background-color: red;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
`
