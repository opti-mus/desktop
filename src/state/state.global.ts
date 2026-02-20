import { create, StoreApi, UseBoundStore } from 'zustand';
import type { WindowTable } from '../types/config';

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never

export interface GlobalState {
  theme: 'light' | 'dark';
  windows: WindowTable[];
  addWindow: (window: WindowTable) => void;
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
    theme: 'light',
    windows: [],
    addWindow: (window: WindowTable) => {
      set((state) => ({ windows: [...state.windows, window] }));
    },
  }
});

export const useGlobalStore = createSelectors(globalStore);

