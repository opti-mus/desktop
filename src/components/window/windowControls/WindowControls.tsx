import {WindowControlsStyles} from "./WindowControls.styles";
import { useGlobalStore } from "../../../state/state.global";
import type { Shortcut } from "../../../types/config";

type WindowControlsProps = {
  shortcut: Shortcut;
};

const WindowControls = ({ shortcut } : WindowControlsProps) => {

    const minimizeWindow = useGlobalStore.use.minimizeWindow();
    const maximizeWindow = useGlobalStore.use.maximizeWindow();
    const closeWindow = useGlobalStore.use.closeWindow();

    const { id } = shortcut.newWindow;

    return (
        <WindowControlsStyles>
            <button onClick={() => minimizeWindow(id)}>Minimize</button>
            <button onClick={() => {maximizeWindow(id)}}>Maximize</button>
            <button onClick={() => {closeWindow(id)}}>Close</button>
        </WindowControlsStyles>
    )
}

export default WindowControls;  