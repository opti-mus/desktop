import {WindowControlsStyles} from "./WindowControls.styles";
import { useGlobalStore } from "../../state/state.global";
import type { WindowTemplate } from "../../types/config";

type WindowControlsProps = {
  window: WindowTemplate;
};

const scrollController = {
    disableScroll() {
        document.body.style.overflow = "hidden";
    },
    enableScroll() {
        document.body.style.overflow = "auto";
    },
}

const WindowControls = ({ window } : WindowControlsProps) => {
    const minimizeWindow = useGlobalStore.use.minimizeWindow();
    const maximizeWindow = useGlobalStore.use.maximizeWindow();
    const closeWindow = useGlobalStore.use.closeWindow();

    return (
        <>
            <WindowControlsStyles>
                <button onClick={() => minimizeWindow(window)}>Minimize</button>
                <button onClick={() => {
                    maximizeWindow(window);
                    !window.isMaximized 
                    ? scrollController.disableScroll() 
                    : scrollController.enableScroll();
                }}>Maximize</button>
                <button onClick={() => closeWindow(window)}>Close</button>
            </WindowControlsStyles>
        </>
    )
}

export default WindowControls;  