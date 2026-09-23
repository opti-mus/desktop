import { useRef } from "react";
import { useBlockStore } from "../../../state/BlockStoreSlice";
import { useGlobalStore } from "../../../state/state.global";
import type { Widjet } from "../../../types/config"
import { useMovableObject } from "../../../hooks/useMovableObject";
import { WidjetStyles, WidgetTitleBarStyles } from "./WidjetComponent.styles";
import WindowControls from "../../window/windowControls/WindowControls";

type WidjetProps = {
    widjet: Widjet
}

export const WidjetComponent = ({ widjet }: WidjetProps) => {
    const {
        id,
        name,
        render,
        isOpen,
        isMaximized,
        isFocused,
    } = widjet;

    const blockZIndices = useBlockStore(
        state => state.blockZIndices
    )

    const myZIndex = blockZIndices[id] || 1

    const minimizeWidjet = useGlobalStore.use.minimizeWidjet()
    const maximizeWidjet = useGlobalStore.use.maximizeWidjet()
    const closeWidjet = useGlobalStore.use.closeWidjet()
    const changeWidjetProps = useGlobalStore.use.changeWidjetProps()

    const widgetRef = useRef<HTMLDivElement>(null)

    const { startMoveHandler } = useMovableObject({
        refObject: widgetRef
    })

    const handleMouseDown = (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        changeWidjetProps({
            id,
            isFocused: true
        })

        startMoveHandler(e)
    }

    if (!isOpen) {
        return null
    }

    return (
        <WidjetStyles
            ref={widgetRef}
            $zIndex={myZIndex}
            $isMaximized={!!isMaximized}
            $isFocused={!!isFocused}
            data-index={id}
            data-widget
            id={id}>
            <WidgetTitleBarStyles
                onMouseDown={handleMouseDown}
            >
                <span>{name}</span>

                <WindowControls
                    window={widjet}
                    controls={{
                        minimize: minimizeWidjet,
                        maximize: maximizeWidjet,
                        close: closeWidjet,
                    }}
                />
            </WidgetTitleBarStyles>

            <div>
                {render?.()}
            </div>
        </WidjetStyles>
    )
}