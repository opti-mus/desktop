import { ShortcutStyles } from "./Shortcut.styles";
import type { Shortcut } from "../../types/config";
import { useGlobalStore } from "../../state/state.global";

type ShortcutProps = {
    shortcut: Shortcut;
}

const ShortcutComponent = ({ shortcut } : ShortcutProps) => {
    
    const changeWindowProps = useGlobalStore.use.changeWindowProps();
    const { id } = shortcut.newWindow;

    const handleClickShortcut = () => {
        if(!id) return;
        shortcut.action?.();
        changeWindowProps(id, { isOpen: true, isFocused: true})
    }
    return  (
        <ShortcutStyles onClick={handleClickShortcut}>
            <span>{shortcut.name}</span>
        </ShortcutStyles>
    )
}

export default ShortcutComponent;