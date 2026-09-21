import { useRef } from 'react'
import { useMovableObject } from '../../../hooks/useMovableObject'
import { useGlobalStore } from '../../../state/state.global'
import type { WindowTemplate } from '../../../types/config'
import TitleBar from '../titleBar/TitleBar'
import { WindowTableStyles } from './Window.styles'
import { useBlockStore } from '../../../state/BlockStoreSlice'

type WindowTableProps = {
    window: WindowTemplate
}

const WindowTable = ({ window }: WindowTableProps) => {
    const { id, name, render, isMaximized, isOpen, isFocused } = window
    
    const changeWindowProps = useGlobalStore.use.changeWindowProps()

    const blockZIndices = useBlockStore((state) => state.blockZIndices);
    const myZIndex = blockZIndices[`window-${id}`] || 1;


    const windowRef = useRef<HTMLDivElement>(null)
    const { startMoveHandler } = useMovableObject({ refObject: windowRef })

    const activeWindow = (e: React.MouseEvent<HTMLDivElement>) => {
        changeWindowProps({ id, isFocused: true })
        startMoveHandler(e)
    }

    return (
<<<<<<< HEAD
        <WindowTableStyles ref={windowRef} $isMaximized={!!isMaximized} $isOpen={!!isOpen} $isFocused={!!isFocused} id={`window-${id}`} style={{ zIndex: myZIndex }}>
=======
        <WindowTableStyles
            data-window={'todo'}
            ref={windowRef}
            $isMaximized={!!isMaximized}
            $isOpen={!!isOpen}
            $isFocused={!!isFocused}>
>>>>>>> f0fa860128f7470fca55d7fa6e6ad1d8e4ef3a47
            <TitleBar window={window} onMouseDown={activeWindow} />
            <h1>{name}</h1>
            <div>{render?.()}</div>
        </WindowTableStyles>
    )
}

export default WindowTable
