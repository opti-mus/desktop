import styled from "styled-components";

export const ShortcutStyles = styled.div`
width: 80px;
height: 80px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
background-color: #d3d3d3;
color: #000000;
border: 1px solid #3b3b3b;
border-radius: 5px;
padding: 10px;
user-select: none;
cursor: pointer;
&:hover {
    background-color: #c0c0c0;}
`;