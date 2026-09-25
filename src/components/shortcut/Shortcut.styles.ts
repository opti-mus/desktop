import styled from "styled-components";

type ShortcutStylesType = {
    $isHovered?: boolean
}

export const ShortcutStyles = styled.div<ShortcutStylesType>`
    position: absolute;
    top: 0;
    left: 0;
    width: 80px;
    height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: ${({ $isHovered }) => $isHovered ? 'red !important' : '#d3d3d3'};
    color: #000000;
    border: 1px solid #3b3b3b;
    border-radius: 5px;
    padding: 10px;
    user-select: none;
    cursor: pointer;
    &:hover {
        background-color: #c0c0c0;
    }
`;