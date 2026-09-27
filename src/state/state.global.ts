import type { StoreApi, UseBoundStore } from 'zustand'
import { create } from 'zustand'
import { createBackgroundSlice, type BackgroundStateSlice } from './BackgroundSlice'
import { createShortcutSlice, type ShortcutStateSlice } from './ShortcutSlice'
import { createWindowSlice, type WindowStateSlice } from './WindowSlice'

type WithSelectors<S> = S extends { getState: () => infer T } ? S & { use: { [K in keyof T]: () => T[K] } } : never

type GlobalState = WindowStateSlice & ShortcutStateSlice & BackgroundStateSlice

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(_store: S) => {
  const store = _store as WithSelectors<typeof _store>
  store.use = {}
  for (const k of Object.keys(store.getState())) {
    ; (store.use as any)[k] = () => store(s => s[k as keyof typeof s])
  }

  return store
}

// export const globalStore = create<GlobalState>()(
//   persist(
//     (...a) => ({
//       ...createWindowSlice(...a),
//       ...createShortcutSlice(...a),
//       ...createBackgroundSlice(...a)
//     }),
//     {
//       name: 'store',
//       storage: createJSONStorage(() => localStorage),
//     },
//   ),
// )
export const globalStore = create<GlobalState>()(

  (...a) => ({
    ...createWindowSlice(...a),
    ...createShortcutSlice(...a),
    ...createBackgroundSlice(...a)
  }

  ),
)
export const useGlobalStore = createSelectors(globalStore);
