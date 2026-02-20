import IconBar from "../iconBar/IconBar";
import WindowControls from "../windowControls/WindowControls";
import { TitleBarStyles } from "./TitleBar.styles";
import type { WindowTemplate } from "../../types/config";

type TitleBarProps = {
    window: WindowTemplate;
}

const TitleBar = ({ window } : TitleBarProps) => {
    return (
        <>
            <TitleBarStyles>
                <IconBar />
                <span>Title Bar</span>
                <WindowControls window={window} />
            </TitleBarStyles>
        </>
    )
}

export default TitleBar;