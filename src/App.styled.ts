import styled from "styled-components";

type WindowContainerStyleProps = {
    $previewUrl: string | null;
    $mode: string;
}

export const AppStyles = styled.div`
min-width: 100vw;
display: flex;
flex-wrap: wrap;
gap: 10px;
padding: 10px;
`

export const WindowContainerStyles = styled.div<WindowContainerStyleProps>`
position: fixed;
top: 0;
left:0;
min-width: 100vw;
min-height: 100vh;
background-image: url(${({$previewUrl}) => $previewUrl ? $previewUrl : "none"});
background-size: ${({$mode}) => $mode === "fill" ? "100% 100%" : $mode};
background-position: center;
background-repeat: no-repeat;
`