import { useRef } from 'react'
import { useGlobalStore } from '../../../state/state.global'
import { allowedTypes, handleChangeBackground } from '../../background/background.utils'

import { BackgroundMode } from '../../../state/BackgroundSlice'

import { ContextMenuInputFile, SubMenuStyles } from '../contextMenuComponent/ContextMenu.styles'

type ContextMenuProps = {
    setIsMenuOpen: (isOpen: boolean) => void
}

export const ContextMenuBackground = ({ setIsMenuOpen }: ContextMenuProps) => {
    const { setMode, setBackground } = useGlobalStore()

    const refInputFile = useRef<HTMLInputElement | null>(null)
    return (
        <>
            <SubMenuStyles>
                <ContextMenuInputFile
                    ref={refInputFile}
                    type="file"
                    id="background-desktop"
                    name="background"
                    accept={allowedTypes.join(', ')}
                    onChange={e => {
                        handleChangeBackground(e, refInputFile, setBackground)
                        setIsMenuOpen(false)
                    }}
                />
                Change Background
            </SubMenuStyles>

            <SubMenuStyles
                onClick={() => {
                    setMode(BackgroundMode.CONTAIN)
                    setIsMenuOpen(false)
                }}>
                Contain
            </SubMenuStyles>
            <SubMenuStyles
                onClick={() => {
                    setMode(BackgroundMode.COVER)
                    setIsMenuOpen(false)
                }}>
                Cover
            </SubMenuStyles>
            <SubMenuStyles
                onClick={() => {
                    setMode(BackgroundMode.FILL)
                    setIsMenuOpen(false)
                }}>
                Fill
            </SubMenuStyles>
        </>
    )
}
