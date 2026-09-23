import styled from 'styled-components'

type WidgetStylesProps = {
    $zIndex: number
    $isMaximized: boolean
    $isFocused: boolean
}

export const WidjetStyles = styled.div<WidgetStylesProps>`
    position: absolute;
    top: 300px;
    left: 600px;

    z-index: ${({ $zIndex }) => $zIndex};

    display: ${({ $isFocused }) => $isFocused && 'flex'};

    flex-direction: column;

    width: 500px;
    min-height: 400px;

    border: 1px solid #ccc;
    border-radius: 8px;

    background: #c2c2c2;
    border: 1px solid #555;
`

export const WidgetTitleBarStyles = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 32px;
    padding: 0 8px;

    cursor: grab;
`