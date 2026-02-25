import { ShortcutStyles } from "./Shortcut.styles";
import type { Shortcut } from "../../types/config";
import { useGlobalStore } from "../../state/state.global";

type ShortcutProps = {
    shortcut: Shortcut;
}

const ShortcutComponent = ({ shortcut } : ShortcutProps) => {
    console.log(shortcut);
    
    const openWindow = useGlobalStore.use.openWindow();

    const handleClickShortcut = () => {
        shortcut.action?.();
        openWindow(shortcut.newWindow)
    }
    return  (
        <ShortcutStyles onClick={handleClickShortcut}>
            <span>{shortcut.name}</span>
        </ShortcutStyles>
    )
}

export default ShortcutComponent;