import styled from "styled-components";

type WindowTableStylesProps = {
    $isMaximized: boolean;
    $isOpen: boolean;
    $isFocused: boolean;
}

export const WindowTableStyles = styled.div<WindowTableStylesProps>`
  width: ${({ $isMaximized }) => ($isMaximized ? "100vw" : "500px")};
  height: ${({ $isMaximized }) => ($isMaximized ? "100vh" : "500px")};

  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;

  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  flex-direction: column;

  position: fixed;
  
  top: 0;
  left: 0;
  
  z-index: ${({ $isFocused }) => ($isFocused ? 1000 : 1)};
  `;