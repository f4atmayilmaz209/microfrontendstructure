declare module 'host/cartStore' {
  import { StoreApi, UseBoundStore } from 'zustand';

  interface CartItem {
    id: number;
    title: string;
    image: string;
    price: number;
    quantity: number;
  }

  interface CartState {
    items: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
  }

  export const useCartStore: UseBoundStore<StoreApi<CartState>>;
}