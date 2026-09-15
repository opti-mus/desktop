// import { create } from 'zustand';

// export type BlockStoreSlice = {
//   activeBlockId: string | null;
//   maxZIndex: number;
//   blockZIndices: Record<string, number>;
//   bringToFront: (id: string) => void;
// };

// export const useBlockStore = create<BlockStoreSlice>((set) => ({
//   activeBlockId: null,
//   maxZIndex: 10,
//   blockZIndices: {},
//   bringToFront: (id) =>
//     set((state) => {
//       const nextZIndex = state.maxZIndex + 1;
//       return {
//         activeBlockId: id,
//         maxZIndex: nextZIndex,
//         blockZIndices: {
//           ...state.blockZIndices,
//           [id]: nextZIndex,
//         },
//       };
//     }),
// }));
import {create, type StateCreator } from 'zustand';

export type BlockStateSlice = {
  activeBlockId: string | null;
  maxZIndex: number;
  blockZIndices: Record<string, number>;
  
  bringToFront: (id: string) => void;
}

export const createBlockSlice: StateCreator<
  BlockStateSlice,
  [],
  [],
  BlockStateSlice
> = (set) => {
  return {
    activeBlockId: null,
    maxZIndex: 10,
    blockZIndices: {},
    
    bringToFront: (id: string) => {
      set((state: BlockStateSlice) => {
        const nextZIndex = state.maxZIndex + 1;
        return {
          activeBlockId: id,
          maxZIndex: nextZIndex,
          blockZIndices: {
            ...state.blockZIndices,
            [id]: nextZIndex,
          },
        };
      });
    },
  };
};

export const useBlockStore = create<BlockStateSlice>()((...a) => ({
  ...createBlockSlice(...a),
}));
