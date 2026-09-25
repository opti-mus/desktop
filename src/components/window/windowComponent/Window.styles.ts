import styled from 'styled-components'

type WindowTableStylesProps = {
    $isMaximized: boolean
    $isOpen: boolean
    $isFocused: boolean
}

export const WindowTableStyles = styled.div<WindowTableStylesProps>`
    width: ${({ $isMaximized }) => ($isMaximized ? '100vw !important' : '500px')};
    min-width: 350px;
    height: ${({ $isMaximized }) => ($isMaximized ? '100vh !important' : '500px')};
    min-height: 350px;

    overflow-y: auto;
    /* scrollbar-width: none;
    -ms-overflow-style: none; */

    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 5px;

    display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
    flex-direction: column;

    position: absolute;
    top: 0;
    left: 0;

    z-index: ${({ $isFocused }) => ($isFocused ? 1000 : 1)};
`
