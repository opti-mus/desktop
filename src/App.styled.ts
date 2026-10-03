import styled from 'styled-components'

type WindowContainerStyleProps = {
    $previewUrl: string | null
    $mode: string
}

export const AppStyles = styled.div`
    display: flex;

    flex-wrap: wrap;
    gap: 10px;

    padding: 10px;
`

export const WindowContainerStyles = styled.div<WindowContainerStyleProps>`
    position: fixed;
    top: 0;
    left: 0;

    min-width: 100vw;
    min-height: 100vh;

    background-image: url(${({ $previewUrl }) => ($previewUrl ? $previewUrl : 'none')});
    background-size: ${({ $mode }) => ($mode === 'fill' ? '100% 100%' : $mode)};
    background-position: center;
    background-repeat: no-repeat;
`

export const WindowContainerTitle = styled.h1`
    text-shadow: 2px 2px 4px rgba(235, 235, 235, 0.5);`

export const AppButtonStyles = styled.button`
    padding: 10px;
    margin: 5px;

    background-color: rgba(184, 184, 184, 0.5);
    backdrop-filter: blur(10px);

    border: 1px solid #ccc;
    border-radius: 5px;

    cursor: pointer;

    &:hover {
        background-color: rgba(184, 184, 184, 0.8);
    }
    `