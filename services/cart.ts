"use server";
import { cookies } from 'next/headers';
import { kv } from '@vercel/kv';
import { nanoid } from 'nanoid';
import { revalidatePath } from 'next/cache';

export interface CartItem {
  id: string;
  productId: number;
  quantity: number;
}

const getCartId = (): string => {
  const cookieStore = cookies();
  let cartId = cookieStore.get('cartId')?.value;

  if (!cartId) {
    cartId = nanoid();
    cookieStore.set('cartId', cartId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    });
  }

  return cartId;
};

const getCartKey = (cartId: string): string => {
  return `cart:${cartId}`;
};

export const getCart = async (): Promise<CartItem[]> => {
  const cartId = getCartId();
  const cartItems = await kv.get<CartItem[]>(getCartKey(cartId));
  return cartItems || [];
};

export const addToCart = async (productId: number, quantity: number): Promise<CartItem[]> => {
  const cartId = getCartId();
  const cart = await getCart();
  const existingItemIndex = cart.findIndex(item => item.productId === productId);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({
      id: nanoid(),
      productId,
      quantity,
    });
  }

  await kv.set(getCartKey(cartId), cart);
  revalidatePath('/cart');
  return cart;
};

export const removeFromCart = async (productId: number): Promise<CartItem[]> => {
  const cartId = getCartId();
  const cart = await getCart();
  const updatedCart = cart.filter(item => item.productId !== productId);
  await kv.set(getCartKey(cartId), updatedCart);
  revalidatePath('/cart');
  return updatedCart;
};

export const updateCartItemQuantity = async (productId: number, quantity: number): Promise<CartItem[]> => {
  const cartId = getCartId();
  const cart = await getCart();
  const itemIndex = cart.findIndex(item => item.productId === productId);

  if (itemIndex > -1) {
    cart[itemIndex].quantity = quantity;
    await kv.set(getCartKey(cartId), cart);
  }

  revalidatePath('/cart');
  return cart;
};

export const clearCart = async (): Promise<void> => {
  const cartId = getCartId();
  await kv.del(getCartKey(cartId));
  revalidatePath('/cart');
};
