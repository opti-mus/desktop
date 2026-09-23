import type { Widjet, WindowTemplate } from '../../../types/config'
import { WindowControlsStyles } from './WindowControls.styles'

type WindowControlsProps = {
    window: WindowTemplate | Widjet;

    controls: {
        minimize: (id: string) => void
        maximize: (id: string) => void
        close: (id: string) => void
    }
}

const WindowControls = ({ window, controls }: WindowControlsProps) => {

    const { id } = window

    return (
        <WindowControlsStyles>
            <button onClick={() => controls.minimize(id)}>Minimize</button>
            <button onClick={() => controls.maximize(id)}>Maximize</button>
            <button onClick={() => controls.close(id)}>Close</button>
        </WindowControlsStyles>
    )
}

export default WindowControls
