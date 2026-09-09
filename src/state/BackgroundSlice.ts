import type { StateCreator } from "zustand";

export enum BackgroundMode {
    CONTAIN = "contain",
    COVER = "cover",
    FILL = "fill",
}


export interface BackgroundStateSlice {
    file: File | null;
    previewUrl: string | null;
    mode: BackgroundMode;

    setMode: (mode: BackgroundMode) => void;
    setBackground: (file: File | null) => void;
}

export const createBackgroundSlice: StateCreator<
    BackgroundStateSlice,
    [],
    [],
    BackgroundStateSlice> = (set, get) => ({
        file: null,
        previewUrl: null,
        mode: BackgroundMode.COVER,

        setMode: (mode) => set({ mode }),

        setBackground: (file: File | null) => {
            const oldPreviewUrl = get().previewUrl;

            if (oldPreviewUrl) {
                URL.revokeObjectURL(oldPreviewUrl);
            }

            if (!file) {
                set({ file: null, previewUrl: null });
                return;
            }

            const previewUrl = URL.createObjectURL(file);
            set({ file, previewUrl })
        },
    });