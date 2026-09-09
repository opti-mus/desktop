import { create, type StateCreator } from "zustand";

export type MovableObject = {
    id: string,
    x: number;
    y: number,
    isMoving?: boolean,
    triggerMove?: boolean
    customHandler?: (props: Partial<MovableObject>) => void

}

export const baseMovableObject: MovableObject = {
    id: crypto.randomUUID(),
    x: 0,
    y: 0,
    isMoving: false
}

export interface MovableSlice {
    positions: MovableObject[]

    addMovableObject: (newPos: MovableObject) => void
    setMovableObject: (newPos: Partial<MovableObject>) => void
    setProps: (newProps: Partial<MovableSlice>) => void

}

export const createMovableSlice: StateCreator<
    MovableSlice,
    [],
    [],
    MovableSlice> = (set, get) => ({
        positions: [],

        addMovableObject: (newPos: MovableObject) => {
            set(() => {
                const current = get().positions.some(i => i.id === newPos.id)
                if (current) return { positions: get().positions }
                return {
                    positions: [...get().positions, newPos]
                }
            });
        },

        setMovableObject: (newPos: Partial<MovableObject>) => {
            set(() => ({
                positions: get().positions.map(item => {
                    if (item.id === newPos.id) return { ...item, ...newPos }
                    return item
                })
            }));
        },

        setProps: (newProps: Partial<MovableSlice>) => {
            set(() => ({ ...get(), ...newProps }));
        }
    });

export const movableStore = create<MovableSlice>()((...a) => ({
    ...createMovableSlice(...a),
}));