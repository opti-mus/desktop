import type { StateCreator } from 'zustand';
import type { DesktopObject, DialogType, Shortcut } from "../types/config";

export interface ShortcutStateSlice {
  shortcuts: Shortcut[];

  addShortcut: (shortcut: Shortcut) => void;
  changeShortcutProps: (newProps: Partial<Shortcut>) => void
  changePropsForAll: (props: Partial<Shortcut>) => void
  setShortcuts: (newShortcuts: DesktopObject<DialogType.SHORTCUT>[]) => void

}

export const createShortcutSlice: StateCreator<
  ShortcutStateSlice,
  [],
  [],
  ShortcutStateSlice> = (set, get) => {
    return {
      shortcuts: [],
      addShortcut: (shortcut: Shortcut) => {
        set((state: ShortcutStateSlice) => ({ shortcuts: [...state.shortcuts, shortcut] }));
      },
      changeShortcutProps: (props: Partial<Shortcut>) => {
        set(() => ({
          shortcuts: get().shortcuts.map(item => {
            if (item.id === props.id) return { ...item, ...props }
            return item
          })
        }));
      },
      changePropsForAll: (props: Partial<Shortcut>) => {
        set(() => ({
          shortcuts: get().shortcuts.map(item => {
            return { ...item, ...props }

          })
        }));
      },
      setShortcuts: (newShortcuts: DesktopObject<DialogType.SHORTCUT>[]) => {
        set(() => ({
          shortcuts: newShortcuts
        }));
      },

    }
  };