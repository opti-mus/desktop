import { useRef } from 'react'
import { useMovableObject } from '../../../hooks/useMovableObject'
import { useBlockStore } from '../../../state/BlockStoreSlice'
import { useGlobalStore } from '../../../state/state.global'
import type { WindowTemplate } from '../../../types/config'
import TitleBar from '../titleBar/TitleBar'
import { WindowTableStyles } from './Window.styles'

type WindowTableProps = {
    window: WindowTemplate
}

const WindowTable = ({ window }: WindowTableProps) => {
    const { id, name, render, isMaximized, isOpen, isFocused } = window

    const changeWindowProps = useGlobalStore.use.changeWindowProps()

    const blockZIndices = useBlockStore(state => state.blockZIndices)
    const myZIndex = blockZIndices[`window-${id}`] || 1

    const windowRef = useRef<HTMLDivElement>(null)
    const { startMoveHandler } = useMovableObject({ refObject: windowRef })

    const activeWindow = (e: React.MouseEvent<HTMLDivElement>) => {
        changeWindowProps({ id, isFocused: true })
        startMoveHandler(e)
    }

    return (
        <WindowTableStyles
            ref={windowRef}
            $isMaximized={!!isMaximized}
            $isOpen={!!isOpen}
            $isFocused={!!isFocused}
            data-index={id}
            id={`window-${id}`}
            style={{ zIndex: myZIndex }}>
            <TitleBar window={window} onMouseDown={activeWindow} />
            <h1>{name}</h1>
            <div>{render?.()}</div>
        </WindowTableStyles>
    )
}

export default WindowTable
