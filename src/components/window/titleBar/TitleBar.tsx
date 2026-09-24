import type { DesktopObject, DialogType } from '../../../types/config'
import IconBar from '../iconBar/IconBar'
import WindowControls from '../windowControls/WindowControls'
import { TitleBarStyles } from './TitleBar.styles'

type TitleBarProps = {
    window: DesktopObject<DialogType.BASE | DialogType.WIDGET>
} & React.ComponentProps<'div'>

const TitleBar = ({ window, ...props }: TitleBarProps) => {
    return (
        <TitleBarStyles {...props}>
            <IconBar />
            <span>{window.name}</span>
            {!window?.disabledControls && <WindowControls window={window} />}
        </TitleBarStyles>
    )
}

export default TitleBar
