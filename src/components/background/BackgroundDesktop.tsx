import { useRef } from 'react'
import { BackgroundMode } from '../../state/BackgroundSlice'
import { globalStore } from '../../state/state.global'
import {
    BackgroundButtonStyles,
    BackgroundInputStyles,
    BackgroundLabelStyles,
    BackgroundStyles
} from './BackgroundDesktop.styles'
import { allowedTypes, handleChangeBackground } from './background.utils'

const BackgroundDesktop = () => {
    const { setMode, setBackground } = globalStore()

    const fileInputRef = useRef<HTMLInputElement>(null)

    return (
        <BackgroundStyles>
            <BackgroundLabelStyles htmlFor="background-desktop">
                <BackgroundInputStyles
                    ref={fileInputRef}
                    type="file"
                    id="background-desktop"
                    name="background"
                    accept={allowedTypes.join(', ')}
                    onChange={e => handleChangeBackground(e, fileInputRef, setBackground)}
                />
                <span>Change background</span>
            </BackgroundLabelStyles>
            <BackgroundButtonStyles onClick={() => setMode(BackgroundMode.CONTAIN)}>Contain</BackgroundButtonStyles>
            <BackgroundButtonStyles onClick={() => setMode(BackgroundMode.COVER)}>Cover</BackgroundButtonStyles>
            <BackgroundButtonStyles onClick={() => setMode(BackgroundMode.FILL)}>Fill</BackgroundButtonStyles>
        </BackgroundStyles>
    )
}

export default BackgroundDesktop
