import styled from "styled-components";

type WindowTableStylesProps = {
    isMaximized: boolean | undefined;
    isOpen: boolean | undefined;
}

export const WindowTableStyles = styled.div<WindowTableStylesProps>`
    width: ${({isMaximized}) => isMaximized ? "auto" : "500px"};
    height: ${({isMaximized}) => isMaximized ? "auto" : "500px"};
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin: ${({isMaximized}) => isMaximized ? "0" : "10px"};
    display: ${({isOpen}) => isOpen ? "flex" : "none"};
    flex-direction: column;
    position: ${({isMaximized}) => isMaximized ? "fixed" : "absolute"};
    inset: ${({isMaximized}) => isMaximized ? "0" : "auto"};
`