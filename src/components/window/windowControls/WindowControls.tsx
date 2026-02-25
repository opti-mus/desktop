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

const WindowControls = ({ shortcut } : WindowControlsProps) => {
    const minimizeWindow = useGlobalStore.use.minimizeWindow();
    const maximizeWindow = useGlobalStore.use.maximizeWindow();
    const closeWindow = useGlobalStore.use.closeWindow();

    return (
        <>
            <WindowControlsStyles>
                <button onClick={() => minimizeWindow(shortcut.newWindow)}>Minimize</button>
                <button onClick={() => {
                    maximizeWindow(shortcut.newWindow);
                    !shortcut.newWindow.isMaximized 
                    ? scrollController.disableScroll() 
                    : scrollController.enableScroll();
                }}>Maximize</button>
                <button onClick={() => {
                    closeWindow(shortcut.newWindow);
                    scrollController.enableScroll();
                }}>Close</button>
            </WindowControlsStyles>
        </>
    )
}

export default WindowControls;  