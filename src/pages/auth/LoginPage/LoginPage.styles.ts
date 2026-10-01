import styled from "styled-components";

export const LoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50% );

`
export const LoginPageWrapperStyles = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    padding: 1rem 2rem;

    background-color: rgba(0, 88, 100, 0.17);
    border-radius: 0.2rem;
    border: 1px solid rgba(0, 68, 100, 0.51);

`


export const LoginPageInput = styled.input`
    padding:0.2rem 0;
    outline: none;

    margin-top: 0.2rem;
`
export const LoginPageButton = styled.button`
    background: rgba(0, 88, 100, 0.17);
    border: 1px solid rgba(0, 68, 100, 0.51);

    padding: 0.3rem;

    cursor: pointer;
    
`