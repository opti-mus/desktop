import styled from "styled-components";


type StartMenuElementProps = {
    $isOpen?: boolean;
    $isActive?: boolean
}

export const StartMenuElement = styled.div<StartMenuElementProps>`
    position: relative;

    padding: 1rem;
    background-color: rgba(0,0,0,0.3);

    &::after {
        content: '';
        height: 0.2rem;
        width: ${({ $isOpen, $isActive }) => $isOpen ? '0.9rem' : $isActive ? '0.4rem' : '0rem'};

        background-color: aqua;

        position: absolute;
        bottom: 5%;
        left: 50%;

        transform: translateX(-50%);

        transition: width .1s ease-in-out;

    }
`