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
  minimizeWindow: (window: WindowTemplate) => void;
  maximizeWindow: (window: WindowTemplate) => void;
  closeWindow: (window: WindowTemplate) => void;
  openWindow: (window: WindowTemplate) => void;
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
    minimizeWindow: (window: WindowTemplate) => {
      set((state) => ({
        windows: state.windows.map((w) => w.id === window.id ? { ...w, isMinimized: true } : w)
      }));
    },
    maximizeWindow: (window: WindowTemplate) => {
      set((state) => ({
        shortcuts: state.shortcuts.map((w) => w.newWindow.id === window.id ? { ...w, newWindow:{ ...w.newWindow, isMaximized: !w.newWindow.isMaximized } } : w)
      }));
    },
    closeWindow: (window: WindowTemplate) => {
      set((state) => ({
        shortcuts: state.shortcuts.map((w) => w.newWindow.id === window.id ? { ... w, newWindow:{ ...w.newWindow, isOpen: false, isMinimized: false, isMaximized: false} } : w)
      }));
    },
    openWindow: (window: WindowTemplate) => {
      set((state) => ({
        shortcuts: state.shortcuts.map((w) => w.newWindow.id === window.id ? { ...w, newWindow: {...w.newWindow, isOpen: true}} : w)
      }));
    }
  }
});

export const useGlobalStore = createSelectors(globalStore);

