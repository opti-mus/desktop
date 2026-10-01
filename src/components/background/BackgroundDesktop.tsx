import { useRef } from 'react'
import { BackgroundMode } from '../../state/BackgroundSlice'
import { globalStore } from '../../state/state.global'
import { BackgroundStyles } from './BackgroundDesktop.styles'
import { allowedTypes, handleChangeBackground } from './background.utils'

const BackgroundDesktop = () => {
    const { setMode, setBackground } = globalStore()

    const fileInputRef = useRef<HTMLInputElement>(null)

    return (
        <BackgroundStyles>
            <label htmlFor="background-desktop">
                <input
                    ref={fileInputRef}
                    type="file"
                    id="background-desktop"
                    name="background"
                    accept={allowedTypes.join(', ')}
                    onChange={e => handleChangeBackground(e, fileInputRef, setBackground)}
                />
                <span>Change background</span>
            </label>
            <button onClick={() => setMode(BackgroundMode.CONTAIN)}>Contain</button>
            <button onClick={() => setMode(BackgroundMode.COVER)}>Cover</button>
            <button onClick={() => setMode(BackgroundMode.FILL)}>Fill</button>
        </BackgroundStyles>
    )
}

export default BackgroundDesktop
