"use client";
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
} from '@/services/server-actions/cart';

export interface CartItem {
  id: string;
  productId: number;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  fetchCart: () => Promise<void>;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateCartItemQuantity: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  isProductInCart: (productId: number) => { inCart: boolean; quantity: number };
  hasHydrated: boolean;
}

const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        cart: [],
        hasHydrated: false,

        fetchCart: async () => {
          const cart = await getCart();
          set({ cart });
        },

        addToCart: async (productId: number, quantity: number) => {
          const cart = await addToCart(productId, quantity);
          set({ cart });
        },

        removeFromCart: async (productId: number) => {
          const cart = await removeFromCart(productId);
          set({ cart });
        },

        updateCartItemQuantity: async (productId: number, quantity: number) => {
          const cart = await updateCartItemQuantity(productId, quantity);
          set({ cart });
        },

        clearCart: async () => {
          await clearCart();
          set({ cart: [] });
        },

        isProductInCart: (productId: number) => {
          const cart = get().cart;
          const item = cart.find((item) => item.productId === productId);
          return { inCart: !!item, quantity: item ? item.quantity : 0 };
        },
      }),
      {
        name: 'cart-storage',
        onRehydrateStorage: () => (state) => {
          state?.set({ hasHydrated: true });
        },
      }
    )
  )
);

// Subscribe to store hydration
useCartStore.subscribe((state) => {
  if (state.hasHydrated) {
    state.fetchCart();
  }
});

export default useCartStore;
