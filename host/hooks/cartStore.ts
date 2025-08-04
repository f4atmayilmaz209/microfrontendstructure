'use client';

import { useStore } from 'zustand';
import { createCartStore } from '@/utils/store/cartStore';
import type { CartState } from '@/utils/store/cartStore';

// 🚨 Singleton store (her importta yeniden yaratılmaz!)
const cartStore = createCartStore();

export const useCartStore = <T>(
  selector: (state: CartState) => T
): T => useStore(cartStore, selector);

export const useCartStoreRaw = () => useStore(cartStore);

// Store'u SSR'de geçmek için export et
export { cartStore };