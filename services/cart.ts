import { kv } from '@vercel/kv';
import { cookies } from 'next/headers';
import { nanoid } from 'nanoid';
import { revalidatePath } from 'next/cache';

export interface CartItem {
  id: string;
  productId: number;
  quantity: number;
}

class CartService {
  private getCartId(): string {
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
  }

  private getCartKey(cartId: string): string {
    return `cart:${cartId}`;
  }

  async getCart(): Promise<CartItem[]> {
    const cartId = this.getCartId();
    const cartItems = await kv.get<CartItem[]>(this.getCartKey(cartId));
    return cartItems || [];
  }

  async addToCart(productId: number, quantity: number): Promise<CartItem[]> {
    const cartId = this.getCartId();
    const cart = await this.getCart();
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

    await kv.set(this.getCartKey(cartId), cart);
    revalidatePath('/cart');
    return cart;
  }

  async removeFromCart(productId: number): Promise<CartItem[]> {
    const cartId = this.getCartId();
    const cart = await this.getCart();
    const updatedCart = cart.filter(item => item.productId !== productId);
    await kv.set(this.getCartKey(cartId), updatedCart);
    revalidatePath('/cart');
    return updatedCart;
  }

  async updateCartItemQuantity(productId: number, quantity: number): Promise<CartItem[]> {
    const cartId = this.getCartId();
    const cart = await this.getCart();
    const itemIndex = cart.findIndex(item => item.productId === productId);

    if (itemIndex > -1) {
      cart[itemIndex].quantity = quantity;
      await kv.set(this.getCartKey(cartId), cart);
    }

    revalidatePath('/cart');
    return cart;
  }

  async clearCart(): Promise<void> {
    const cartId = this.getCartId();
    await kv.del(this.getCartKey(cartId));
    revalidatePath('/cart');
  }
}

export const cartApi = new CartService();