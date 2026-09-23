import type { StateCreator } from 'zustand';
import type { Widjet } from "../types/config";

export interface WidjetStateSlice {
  widjets: Widjet[];

  addWidjet: (widjet: Widjet) => void;
  changeWidjetProps: (props: Partial<Widjet>) => void

  minimizeWidjet: (id: string) => void;
  maximizeWidjet: (id: string) => void;
  closeWidjet: (id: string) => void;
}

export const createWidjetSlice: StateCreator<
  WidjetStateSlice,
  [],
  [],
  WidjetStateSlice> = (set) => {
    return {
      widjets: [],

      addWidjet: (widjet) => {
        set((state) => ({ widjets: [...state.widjets, widjet] }));
      },

      minimizeWidjet: (id: string) => {
        set((state) => ({ 
          widjets: state.widjets.map(item => item.id === id 
            ? {...item, isMinimized: true} 
            : item) }));
      },

      maximizeWidjet: (id: string) => {
        set((state) => ({ 
          widjets: state.widjets.map(item => item.id === id 
            ? {...item, isMaximized: !item.isMaximized} 
            : item) }));
      },

      closeWidjet: (id: string) => {
        set((state) => ({ 
          widjets: state.widjets.map(item => item.id === id 
            ? {...item, isOpen : false, isMinimized: false, isMaximized: false} 
            : item) }));
      },

      changeWidjetProps: (props: Partial<Widjet>) => {
            set(state => ({
              widjets: state.widjets.map(item => item.id === props.id 
                ? {...item, ...props}
                : item)
            }));
        },

    }
  };