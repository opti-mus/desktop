import { BackgroundStyles } from "./BackgroundDesktop.styles"
import { useGlobalStore } from "../../state/state.global";

const BackgroundDesktop = () => {
    const setMode = useGlobalStore((state) => state.setMode);
    const setBackground = useGlobalStore((state) => state.setBackground);
    
    return (
        <BackgroundStyles>
            <label htmlFor="background-desktop">
                <input 
                type="file" 
                id="background-desktop" 
                name="background" 
                accept=".png, .jpeg, .jpg"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if(file) {
                        setBackground(file)
                    }
                }}/>
                <span>
                    Change background
                </span>
            </label>
            <button onClick={() => setMode("contain")}>Contain</button>
            <button onClick={() => setMode("cover")}>Cover</button>
            <button onClick={() => setMode("fill")}>Fill</button>
        </BackgroundStyles>
    )
}

export default BackgroundDesktop