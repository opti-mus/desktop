import {WindowControlsStyles} from "./WindowControls.styles";
import { useGlobalStore } from "../../../state/state.global";
import type { WindowTemplate } from "../../../types/config";

type WindowControlsProps = {
  window: WindowTemplate;
};

const scrollController = {
    scrollPosition: 0,
    disableScroll() {
        this.scrollPosition = window.scrollY;
        document.body.style.cssText = `
            overflow: hidden;
            `;
    },
    enableScroll() {
        document.body.style.cssText = `
        overflow: auto;
        `;
        window.scrollTo({top: this.scrollPosition});
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
                <button onClick={() => {
                    closeWindow(window);
                    scrollController.enableScroll();
                }}>Close</button>
            </WindowControlsStyles>
        </>
    )
}

export default WindowControls;  