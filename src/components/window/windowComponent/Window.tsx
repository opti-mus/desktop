import { movableStore } from '../../../state/MovableSilce'
import { useGlobalStore } from '../../../state/state.global'
import type { WindowTemplate } from '../../../types/config'
import { MovableComponent } from '../../movableComponent/MovableComponent'
import TitleBar from '../titleBar/TitleBar'
import { WindowTableStyles } from './Window.styles'

type WindowTableProps = {
    window: WindowTemplate
}

const WindowTable = ({ window }: WindowTableProps) => {
    const { id, name, render, isMaximized, isOpen, isFocused } = window

    const changeWindowProps = useGlobalStore.use.changeWindowProps()
    const setMovableObject = movableStore(state => state.setMovableObject)

    const activeWindow = (e: React.MouseEvent<HTMLDivElement>) => {
        changeWindowProps({ id, isFocused: true })
        setMovableObject({ id, triggerMove: true })
    }

    return (
        <MovableComponent id={window.id}>
            <WindowTableStyles $isMaximized={!!isMaximized} $isOpen={!!isOpen} $isFocused={!!isFocused}>
                <TitleBar window={window} onMouseDown={activeWindow} />
                <h1>{name}</h1>
                <div>{render?.()}</div>
            </WindowTableStyles>
        </MovableComponent>
    )
}

export default WindowTable
