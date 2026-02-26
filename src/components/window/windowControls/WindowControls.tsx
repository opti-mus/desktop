import {WindowControlsStyles} from "./WindowControls.styles";
import { useGlobalStore } from "../../../state/state.global";
import type { Shortcut } from "../../../types/config";

type WindowControlsProps = {
  shortcut: Shortcut;
};

const scrollController = {
    scrollPosition: 0,
    disableScroll() {
        this.scrollPosition = window.scrollY;
    },
    enableScroll() {
        window.scrollTo({top: this.scrollPosition});
    },
}

const WindowControls = ({ shortcut } : WindowControlsProps) => {

    const minimizeWindow = useGlobalStore.use.minimizeWindow();
    const maximizeWindow = useGlobalStore.use.maximizeWindow();
    const closeWindow = useGlobalStore.use.closeWindow();

    const { id, isMaximized } = shortcut.newWindow;

    if(!id) return null;

    return (
        <>
            <WindowControlsStyles>
                <button onClick={() => minimizeWindow(id)}>Minimize</button>
                <button onClick={() => {
                    maximizeWindow(id);
                    !isMaximized 
                    ? scrollController.disableScroll() 
                    : scrollController.enableScroll();
                }}>Maximize</button>
                <button onClick={() => {
                    closeWindow(id);
                    scrollController.enableScroll();
                }}>Close</button>
            </WindowControlsStyles>
        </>
    )
}

export default WindowControls;  