"use client"
import { createStore } from 'zustand/vanilla';

export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

export interface CartState {
  items: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

export const createCartStore = () =>
  createStore<CartState>((set) => ({
    items: [],
    addToCart: (product) =>
      set((state) => {
        const existingItem = state.items.find((item) => item.id === product.id);
        if (existingItem) {
          return {
            items: state.items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + product.quantity }
                : item
            ),
          };
        } else {
          return {
            items: [...state.items, { ...product, quantity: product.quantity }],
          };
        }
      }),
    removeFromCart: (id) =>
      set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      })),
    clearCart: () => set({ items: [] }),
  }));
