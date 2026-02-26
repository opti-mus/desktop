import IconBar from "../iconBar/IconBar";
import WindowControls from "../windowControls/WindowControls";
import { TitleBarStyles } from "./TitleBar.styles";
import type { Shortcut } from "../../../types/config";

type TitleBarProps = {
  shortcut: Shortcut;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const TitleBar = ({ shortcut, onMouseDown } : TitleBarProps) => {
    
    return (
        <>
            <TitleBarStyles onMouseDown={onMouseDown}>
                <IconBar />
                <span>{shortcut.name}</span>
                <WindowControls shortcut={shortcut} />
            </TitleBarStyles>
        </>
    )
}

export default TitleBar;