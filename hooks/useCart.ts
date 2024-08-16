"use client";
import { useEffect } from 'react';
import useCartStore from '@/hooks/useCartStore';

const useCart = () => {
  const { cart, fetchCart, addToCart, removeFromCart, updateCartItemQuantity, clearCart, isProductInCart } = useCartStore(state => ({
    cart: state.cart,
    fetchCart: state.fetchCart,
    addToCart: state.addToCart,
    removeFromCart: state.removeFromCart,
    updateCartItemQuantity: state.updateCartItemQuantity,
    clearCart: state.clearCart,
    isProductInCart: state.isProductInCart,
  }));

  useEffect(() => {
    const initializeCart = async () => {
      try {
        await fetchCart();
      } catch (error) {
        console.error('Failed to fetch cart on initialization:', error);
      }
    };

    initializeCart();
  }, [fetchCart]);

  return {
    cart,
    fetchCart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    isProductInCart,
  };
};

export default useCart;
