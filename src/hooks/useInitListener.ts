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
                store.changeWindowProps({ id: controller.windowID, dimensions: controller.windowDimensions })
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
            'selection:start',
            () => {
                const store = useGlobalStore.getState()
                store.changePropsForAll({ isHovered: false })
            },
            'selection_cle'
        )
        windowController.addCallback(
            'selection:move',
            (_, controller) => {
                console.log('@change')

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
            () => {
                const store = useGlobalStore.getState()
                store.changePropsForAll({ isHovered: false })
            },
            'selection_clear'
        )
    }, [])
}