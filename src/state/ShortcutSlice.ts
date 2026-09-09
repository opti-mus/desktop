import type { StateCreator } from 'zustand';
import type { Shortcut } from "../types/config";

export interface ShortcutStateSlice {
  shortcuts: Shortcut[];

  addShortcut: (shortcut: Shortcut) => void;
}

export const createShortcutSlice: StateCreator<
  ShortcutStateSlice,
  [],
  [],
  ShortcutStateSlice> = (set) => {
    return {
      shortcuts: [],
      addShortcut: (shortcut: Shortcut) => {
        set((state: ShortcutStateSlice) => ({ shortcuts: [...state.shortcuts, shortcut] }));
      },

    }
  };