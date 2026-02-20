import {WindowControlsStyles} from "./WindowControls.styles";
import { useGlobalStore } from "../../state/state.global";
import type { WindowTemplate } from "../../types/config";

type WindowControlsProps = {
  window: WindowTemplate;
};

const WindowControls = ({ window } : WindowControlsProps) => {
    const minimizeWindow = useGlobalStore.use.minimizeWindow();
    const maximizeWindow = useGlobalStore.use.maximizeWindow();
    const closeWindow = useGlobalStore.use.closeWindow();

    return (
        <>
            <WindowControlsStyles>
                <button onClick={() => minimizeWindow(window)}>Minimize</button>
                <button onClick={() => maximizeWindow(window)}>Maximize</button>
                <button onClick={() => closeWindow(window)}>Close</button>
            </WindowControlsStyles>
        </>
    )
}

export default WindowControls;  