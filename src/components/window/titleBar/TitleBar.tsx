import IconBar from "../iconBar/IconBar";
import WindowControls from "../windowControls/WindowControls";
import { TitleBarStyles } from "./TitleBar.styles";
import type { Shortcut } from "../../../types/config";

type TitleBarProps = {
  shortcut: Shortcut;
};

const TitleBar = ({ shortcut } : TitleBarProps) => {
    return (
        <>
            <TitleBarStyles>
                <IconBar />
                <span>{shortcut.name}</span>
                <WindowControls shortcut={shortcut} />
            </TitleBarStyles>
        </>
    )
}

export default TitleBar;