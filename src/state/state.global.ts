import { create } from 'zustand';
import type { StoreApi, UseBoundStore } from 'zustand';
import { createWindowSlice, type WindowStateSlice } from './WindowSlice';
import { createShortcutSlice, type ShortcutStateSlice } from './ShortcutSlice';

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never

type GlobalState = WindowStateSlice & ShortcutStateSlice

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

export const globalStore = create<GlobalState>()((...a) => ({
  ...createWindowSlice(...a),
  ...createShortcutSlice(...a)
}));

export const useGlobalStore = createSelectors(globalStore);
