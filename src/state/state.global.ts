import { create } from 'zustand';
import type { StoreApi, UseBoundStore } from 'zustand';
import type { Shortcut, WindowTemplate } from '../types/config';

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never

interface Actions {
  addShortcut: (shortcut: Shortcut) => void;
  addWindow: (window: WindowTemplate) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  changeWindowProps: (id: string, props: Partial<WindowTemplate>) => void;
}

interface InitialState {
  windows: WindowTemplate[];
  shortcuts: Shortcut[];
}

export interface GlobalState extends InitialState, Actions {}

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

const initialState: InitialState = {
  windows: [],
  shortcuts: [],
}

export const globalStore = create<GlobalState>((set, get) => {
  return {
    ...initialState,
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
    changeWindowProps: (id: string, props: Partial<WindowTemplate>) => {
      set((state) => ({
        shortcuts: state.shortcuts
        .map((shortcut) => shortcut.newWindow.id === id 
        ? { ...shortcut, newWindow: { ...shortcut.newWindow, ...props}} 
        : { ...shortcut, newWindow: { ...shortcut.newWindow, isFocused: false}})
      }))
    }
  }
});

export const useGlobalStore = createSelectors(globalStore);



// openWindow: (id: string) => {
//       set((state) => ({
//         shortcuts: state.shortcuts
//         .map((shortcut) => shortcut.newWindow.id === id 
//         ? { ...shortcut, newWindow: {...shortcut.newWindow, isOpen: true}} 
//         : shortcut)
//       }));
//     },
//     focusWindow: (id: string) => {
//       set((state)=> ({
//         shortcuts: state.shortcuts
//         .map((shortcut) => shortcut.newWindow.id === id 
//         ? { ...shortcut, newWindow: { ...shortcut.newWindow, isFocused: true}} 
//         : { ...shortcut, newWindow: { ...shortcut.newWindow, isFocused: false}})
//       }));
//     },