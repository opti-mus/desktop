import type { StateCreator } from "zustand";
import type { DesktopObject, DialogType, WindowTemplate } from "../types/config";

export interface WindowStateSlice {
    windows: DesktopObject<DialogType.BASE | DialogType.WIDGET>[];

    addWindow: (window: DesktopObject<DialogType.BASE | DialogType.WIDGET>) => void;
    changeWindowProps: (props: Partial<WindowTemplate>) => void
    minimizeWindow: (id: string) => void;
    maximizeWindow: (id: string) => void;
    closeWindow: (id: string) => void;
    changeFocus: (id: string) => void;
}

export const createWindowSlice: StateCreator<
    WindowStateSlice,
    [],
    [],
    WindowStateSlice> = (set, get) => ({
        windows: [],
        addWindow: (window: DesktopObject<DialogType.BASE | DialogType.WIDGET>) => {
            set((state: WindowStateSlice) => ({ windows: [...state.windows, window] }))
        },

        changeWindowProps: (props: Partial<WindowTemplate>) => {
            set(() => ({
                windows: get().windows.map(item => {
                    if (item.id === props.id) return { ...item, ...props }
                    return item
                })
            }));
        },
        minimizeWindow: (id: string) => {
            set((state: WindowStateSlice) => ({
                windows: state.windows.map((s) => s.id === id ? { ...s, isMinimized: true, isOpen: false } : s)
            }));
        },
        maximizeWindow: (id: string) => {
            set((state: WindowStateSlice) => ({
                windows: state.windows
                    .map((s) => s.id === id
                        ? { ...s, isMaximized: !s.isMaximized }
                        : s)
            }));
        },
        closeWindow: (id: string) => {
            set((state: WindowStateSlice) => ({
                windows: state.windows
                    .map((s) => s.id === id
                        ? { ...s, isOpen: false, isMaximized: false, isActive: false }
                        : s)
            }));
        },
        changeFocus: (id: string) => {
            set((state: WindowStateSlice) => ({
                windows: state.windows
                    .map((s) => s.id === id
                        ? { ...s, isFocused: true }
                        : { ...s, isFocused: false })
            }));
        },


    });