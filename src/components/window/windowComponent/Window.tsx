import { useEffect, useRef } from 'react'
import { WindowController } from '../../../classes/WindowController'
import { useGlobalStore } from '../../../state/state.global'
import type { DesktopObject, DialogType } from '../../../types/config'
import TitleBar from '../titleBar/TitleBar'
import { WindowTableStyles } from './Window.styles'

type WindowTableProps = {
    window: DesktopObject<DialogType.BASE | DialogType.WIDGET>
}

const WindowTable = ({ window }: WindowTableProps) => {
    const { id, name, render, isMaximized, isOpen, isFocused } = window

    const changeWindowProps = useGlobalStore.use.changeWindowProps()

    const refObject = useRef<HTMLDivElement | null>(null)

    const activeWindow = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isMaximized) return

        new WindowController().isDragging = true
    }

    const savePositionHandler = () => {
        const controller = new WindowController()
        const position = controller.moveData.get(id)

        if (position) {
            changeWindowProps({ id, position })
        }
    }

    useEffect(() => {
        new WindowController().maximizeWindow(refObject.current, window)
    }, [window.isMaximized])

    useEffect(() => {
        new WindowController().applyDimensions(refObject.current, window)
    }, [])

    return (
        <WindowTableStyles
            data-window={id}
            ref={refObject}
            $isMaximized={!!isMaximized}
            $isOpen={!!isOpen}
            $isFocused={!!isFocused}
            data-index={id}
            id={id}>
            <TitleBar window={window} onPointerDown={activeWindow} onPointerUp={savePositionHandler} />
            {name && <h1>{name}</h1>}
            <div>{render?.()}</div>
        </WindowTableStyles>
    )
}

export default WindowTable
