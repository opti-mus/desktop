import { useMemo } from 'react'
import { useMovableObject } from '../../../hooks/useMovableObject'
import { useGlobalStore } from '../../../state/state.global'
import type { WindowTemplate } from '../../../types/config'
import TitleBar from '../titleBar/TitleBar'
import { WindowTableStyles } from './Window.styles'

type WindowTableProps = {
    window: WindowTemplate
}

const WindowTable = ({ window }: WindowTableProps) => {
    const { id, name, render, isMaximized, isOpen, isFocused, position } = window

    const changeWindowProps = useGlobalStore.use.changeWindowProps()

    const {
        startMoveHandler,
        position: newPosition,
        refObject
    } = useMovableObject({
        moveObject: window
    })

    const windowPosition = useMemo(() => {
        return isMaximized ? 'translate(0,0) !important' : `translate(${newPosition.x}px, ${newPosition.y}px)`
    }, [newPosition, isMaximized])

    const activeWindow = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isMaximized) return

        changeWindowProps({ id, isFocused: true })
        startMoveHandler(e)
    }

    const savePositionHandler = () => {
        changeWindowProps({ id, position: newPosition })
    }
    console.log('@position', position)

    return (
        <WindowTableStyles
            data-window={'todo'}
            ref={refObject}
            $isMaximized={!!isMaximized}
            $isOpen={!!isOpen}
            $windowPosition={windowPosition}
            $isFocused={!!isFocused}>
            <TitleBar window={window} onMouseDown={activeWindow} onPointerUp={savePositionHandler} />
            <h1>{name}</h1>
            <div>{render?.()}</div>
        </WindowTableStyles>
    )
}

export default WindowTable
