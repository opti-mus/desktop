import { ShortcutStyles } from "./Shortcut.styles";
import type { Shortcut } from "../../types/config";
import { useGlobalStore } from "../../state/state.global";

type ShortcutProps = {
    shortcut: Shortcut;
}

const ShortcutComponent = ({ shortcut } : ShortcutProps) => {
    
    const openWindow = useGlobalStore.use.openWindow();
    const { id } = shortcut.newWindow;

    const handleClickShortcut = () => {
        if(!id) return;
        shortcut.action?.();
        openWindow(id)
    }
    return  (
        <ShortcutStyles onClick={handleClickShortcut}>
            <span>{shortcut.name}</span>
        </ShortcutStyles>
    )
}

export default ShortcutComponent;