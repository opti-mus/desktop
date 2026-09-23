import type { WindowTemplate } from '../../../types/config'
import IconBar from '../iconBar/IconBar'
import WindowControls from '../windowControls/WindowControls'
import { TitleBarStyles } from './TitleBar.styles'

type TitleBarProps = {
    window: WindowTemplate
    onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void
    controls : {
        minimize: (id: string) => void
        maximize: (id: string) => void
        close: (id: string) => void
    }
    
}

const TitleBar = ({ window, onMouseDown, controls }: TitleBarProps) => {
    return (
        <TitleBarStyles onMouseDown={onMouseDown}>
            <IconBar />
            <span>{window.name}</span>
            <WindowControls window={window} controls={controls} />
        </TitleBarStyles>
    )
}

export default TitleBar
