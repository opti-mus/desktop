import { useGlobalStore } from '../../../state/state.global'
import type { WindowTemplate } from '../../../types/config'
import { WindowControlsStyles } from './WindowControls.styles'

type WindowControlsProps = {
    window: WindowTemplate
}

const WindowControls = ({ window }: WindowControlsProps) => {
    const { id } = window

    const minimizeWindow = useGlobalStore.use.minimizeWindow()
    const maximizeWindow = useGlobalStore.use.maximizeWindow()
    const closeWindow = useGlobalStore.use.closeWindow()

    return (
        <WindowControlsStyles>
            <button onClick={() => minimizeWindow(id)}>Minimize</button>
            <button onClick={() => maximizeWindow(id)}>Maximize</button>
            <button onClick={() => closeWindow(id)}>Close</button>
        </WindowControlsStyles>
    )
}

export default WindowControls
