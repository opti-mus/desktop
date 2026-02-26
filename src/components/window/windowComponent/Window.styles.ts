import styled from "styled-components";

type WindowTableStylesProps = {
    isMaximized: boolean | undefined;
    isOpen: boolean | undefined;
    isFocused: boolean | undefined;
    pos: PositionProps;
}

type PositionProps = {
    x: number;
    y: number;
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
    top: ${({pos, isMaximized}) => isMaximized ? "0" : `${pos.y}px`};
    left: ${({pos, isMaximized}) => isMaximized ? "0" : `${pos.x}px`};
    z-index: ${({isFocused}) => isFocused ? "1000" : "1"};
`