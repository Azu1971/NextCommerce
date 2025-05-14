import {create} from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
} 

interface CartStore {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    removeFull: (id: string) => void;
}

export const useCartStore = create<CartStore>()(persist(
    (set) => ({
        items: [],
        addItem: (item) => set((state) => {
            const existingItem = state.items.find((i) => i.id === item.id);
            if (existingItem) {
                return {
                    items: state.items.map((i) =>
                        i.id === item.id
                            ? { ...i, quantity: i.quantity + 1 }
                            : i
                    ),
                };
            } else {
                return { items: [...state.items, { ...item, quantity: 1 }] };
            }
        }),
        removeItem: (id) => set((state) => ({
            items: state.items.map((item) => item.id === id ? { ...item, quantity: item.quantity-1 } : item)
                .filter((item) => item.quantity > 0),
        })),
        removeFull: (id) => set((state) => ({
            items: state.items.filter((item) => item.id !== id),
        })),
        clearCart: () => set(() => ({
            items: [],
        })),
    }), {
    name: 'cart', // unique name
}));