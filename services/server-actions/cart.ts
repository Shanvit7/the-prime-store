'use server'

import { cartApi } from "@/services/cart";

export const getCart = async () => {
  return cartApi.getCart();
};

export const addToCart = async (productId: number, quantity: number) => {
  return cartApi.addToCart(productId, quantity);
};

export const removeFromCart = async (productId: number) => {
  return cartApi.removeFromCart(productId);
};

export const updateCartItemQuantity = async (productId: number, quantity: number) => {
  return cartApi.updateCartItemQuantity(productId, quantity);
};

export const clearCart = async () => {
  return cartApi.clearCart();
};