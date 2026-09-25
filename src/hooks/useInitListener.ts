import { useEffect } from "react"
import { WindowController } from "../classes/WindowController"
import { useGlobalStore } from "../state/state.global"

export const useInitListeners = () => {

    useEffect(() => {
        const windowController = new WindowController()

        windowController.addCallback(
            'mouseup',
            (_, controller) => {
                const store = useGlobalStore.getState()
                if (controller.windowID) store.changeWindowProps({ id: controller.windowID, dimensions: controller.windowDimensions })
            },
            'save_window_dimension'
        )
        windowController.addCallback(
            'mousedown',
            (_, controller) => {
                const store = useGlobalStore.getState()
                if (controller.windowID) store.changeFocus(controller.windowID)
            },
            'change_focus'
        )

        windowController.addCallback(
            'selection:move',
            (_, controller) => {
                const store = useGlobalStore.getState()
                store.changePropsForAll({ isHovered: false })

                controller.selectionModule.selections.forEach((_, id) => {
                    store.changeShortcutProps({ id, isHovered: true })
                })
            },
            'selection_change'
        )
        windowController.addCallback(
            'selection:clear',
            (_, controller) => {
                const store = useGlobalStore.getState()
                if (controller.selectionModule.selections.size) {
                    store.changePropsForAll({ isHovered: false })
                }

            },
            'selection_clear'
        )
    }, [])
}