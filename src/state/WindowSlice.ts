import type { StateCreator } from "zustand";
import type { WindowTemplate } from "../types/config";

export interface WindowStateSlice {
    windows: WindowTemplate[];
    addWindow: (window: WindowTemplate) => void;
}

export const createWindowSlice : StateCreator<
WindowStateSlice, 
[],
[],
WindowStateSlice>=(set, get) => ({
    windows: [],
    addWindow: (window: WindowTemplate) => {
        set((state: WindowStateSlice) => ({windows: [...state.windows, window]}))
    }
});