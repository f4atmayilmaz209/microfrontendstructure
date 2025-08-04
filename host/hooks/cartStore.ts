'use client';

import { useStore } from 'zustand';
import { createCartStore } from '@/utils/store/cartStore';
const store = createCartStore();

export const useCartStore = <T>(selector: (state: ReturnType<typeof store.getState>) => T): T =>
  useStore(store, selector);

// Basit kullanım için alternatif:
export const useCartStoreRaw = () => useStore(store);
