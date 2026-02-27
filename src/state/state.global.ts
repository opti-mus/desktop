import { create } from 'zustand';
import type { StoreApi, UseBoundStore } from 'zustand';
import type { Shortcut, WindowTemplate } from '../types/config';

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never

export interface GlobalState {
  windows: WindowTemplate[];
  shortcuts: Shortcut[];
  addShortcut: (shortcut: Shortcut) => void;
  addWindow: (window: WindowTemplate) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  openWindow: (id: string) => void;
  focusWindow: (id: string) => void;
}

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  const store = _store as WithSelectors<typeof _store>
  store.use = {}
  for (const k of Object.keys(store.getState())) {
    ; (store.use as any)[k] = () => store((s) => s[k as keyof typeof s])
  }

  return store
}


export const globalStore = create<GlobalState>((set, get) => {
  return {
    windows: [],
    shortcuts: [],
    addShortcut: (shortcut: Shortcut) => {
      set((state) => ({ shortcuts: [...state.shortcuts, shortcut] }));
    },
    addWindow: (window: WindowTemplate) => {
      set((state) => ({ windows: [...state.windows, window] }));
    },
    minimizeWindow: (id: string) => {
      set((state) => ({
        shortcuts: state.shortcuts.map((shortcut) => shortcut.newWindow.id === id ? { ...shortcut, isMinimized: true } : shortcut)
      }));
    },
    maximizeWindow: (id: string) => {
      set((state) => ({
        shortcuts: state.shortcuts
        .map((shortcut) => shortcut.newWindow.id === id 
        ? { ...shortcut, newWindow:{ ...shortcut.newWindow, isMaximized: !shortcut.newWindow.isMaximized } } 
        : shortcut)
      }));
    },
    closeWindow: (id: string) => {
      set((state) => ({
        shortcuts: state.shortcuts
        .map((shortcut) => shortcut.newWindow.id === id 
        ? { ... shortcut, newWindow:{ ...shortcut.newWindow, isOpen: false, isMinimized: false, isMaximized: false} } 
        : shortcut)
      }));
    },
    openWindow: (id: string) => {
      set((state) => ({
        shortcuts: state.shortcuts
        .map((shortcut) => shortcut.newWindow.id === id 
        ? { ...shortcut, newWindow: {...shortcut.newWindow, isOpen: true}} 
        : shortcut)
      }));
    },
    focusWindow: (id: string) => {
      set((state)=> ({
        shortcuts: state.shortcuts
        .map((shortcut) => shortcut.newWindow.id === id 
        ? { ...shortcut, newWindow: { ...shortcut.newWindow, isFocused: true}} 
        : { ...shortcut, newWindow: { ...shortcut.newWindow, isFocused: false}})
      }));
    },
  }
});

export const useGlobalStore = createSelectors(globalStore);

