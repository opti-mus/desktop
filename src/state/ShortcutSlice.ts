import type { StateCreator } from 'zustand';
import type { Shortcut, WindowTemplate } from "../types/config";

export interface ShortcutStateSlice {
    shortcuts: Shortcut[];

    addShortcut: (shortcut: Shortcut) => void;
    minimizeWindow: (id: string) => void;
    maximizeWindow: (id: string) => void;
    closeWindow: (id: string) => void;
    changeWindowProps: (id: string, props: Partial<WindowTemplate>) => void;
}

export const createShortcutSlice : StateCreator<
ShortcutStateSlice, 
[], 
[], 
ShortcutStateSlice>=(set, get) => {
  return {
    shortcuts: [],
    addShortcut: (shortcut: Shortcut) => {
      set((state: ShortcutStateSlice) => ({ shortcuts: [...state.shortcuts, shortcut] }));
    },
    minimizeWindow: (id: string) => {
      set((state: ShortcutStateSlice) => ({
        shortcuts: state.shortcuts.map((s) => s.newWindow.id === id ? { ...s, isMinimized: true } : s)
      }));
    },
    maximizeWindow: (id: string) => {
      set((state: ShortcutStateSlice) => ({
        shortcuts: state.shortcuts
        .map((s) => s.newWindow.id === id 
        ? { ...s, newWindow:{ ...s.newWindow, isMaximized: !s.newWindow.isMaximized } } 
        : s)
      }));
    },
    closeWindow: (id: string) => {
      set((state: ShortcutStateSlice) => ({
        shortcuts: state.shortcuts
        .map((s) => s.newWindow.id === id 
        ? { ... s, newWindow:{ ...s.newWindow, isOpen: false, isMinimized: false, isMaximized: false} } 
        : s)
      }));
    },
    changeWindowProps: (id: string, props: Partial<WindowTemplate>) => {
      set((state: ShortcutStateSlice) => ({
        shortcuts: state.shortcuts
        .map((s) => s.newWindow.id === id 
        ? { ...s, newWindow: { ...s.newWindow, ...props }} 
        : { ...s, newWindow: { ...s.newWindow, isFocused: false}})
      }))
    }
  }
};