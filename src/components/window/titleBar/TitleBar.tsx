import type { WindowTemplate } from '../../../types/config'
import IconBar from '../iconBar/IconBar'
import WindowControls from '../windowControls/WindowControls'
import { TitleBarStyles } from './TitleBar.styles'

type TitleBarProps = {
    window: WindowTemplate
    onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void
}

const TitleBar = ({ window, onMouseDown }: TitleBarProps) => {
    return (
        <TitleBarStyles onMouseDown={onMouseDown}>
            <IconBar />
            <span>{window.name}</span>
            <WindowControls window={window} />
        </TitleBarStyles>
    )
}

export default TitleBar
