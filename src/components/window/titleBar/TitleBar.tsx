import type { WindowTemplate } from '../../../types/config'
import IconBar from '../iconBar/IconBar'
import WindowControls from '../windowControls/WindowControls'
import { TitleBarStyles } from './TitleBar.styles'

type TitleBarProps = {
    window: WindowTemplate
} & React.ComponentProps<'div'>

const TitleBar = ({ window, ...props }: TitleBarProps) => {
    return (
        <TitleBarStyles {...props}>
            <IconBar />
            <span>{window.name}</span>
            <WindowControls window={window} />
        </TitleBarStyles>
    )
}

export default TitleBar
