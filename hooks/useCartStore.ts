"use client";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  type CartItem
} from '@/services/cart';

interface CartState {
  cart: CartItem[];
  fetchCart: () => Promise<void>;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateCartItemQuantity: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  isProductInCart: (productId: number) => { inCart: boolean; quantity: number };
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      fetchCart: async () => {
        try {
          const cart = await getCart();
          set({ cart });
        } catch (error) {
          console.error('Failed to fetch cart:', error);
        }
      },

      addToCart: async (productId: number, quantity: number) => {
        try {
          const cart = await addToCart(productId, quantity);
          set({ cart });
        } catch (error) {
          console.error('Failed to add to cart:', error);
        }
      },

      removeFromCart: async (productId: number) => {
        try {
          const cart = await removeFromCart(productId);
          set({ cart });
        } catch (error) {
          console.error('Failed to remove from cart:', error);
        }
      },

      updateCartItemQuantity: async (productId: number, quantity: number) => {
        try {
          const cart = await updateCartItemQuantity(productId, quantity);
          set({ cart });
        } catch (error) {
          console.error('Failed to update cart item quantity:', error);
        }
      },

      clearCart: async () => {
        try {
          await clearCart();
          set({ cart: [] });
        } catch (error) {
          console.error('Failed to clear cart:', error);
        }
      },

      isProductInCart: (productId: number) => {
        const cart = get().cart;
        const item = cart.find((item) => item.productId === productId);
        return { inCart: !!item, quantity: item ? item.quantity : 0 };
      },
    }),
    {
      name: 'cart-storage',
      getStorage: () => localStorage, 
    }
  )
);

export default useCartStore;
