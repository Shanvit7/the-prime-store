"use client";

import { useState, useEffect, useTransition, useCallback } from "react";
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
} from "@/services/server-actions/cart";

export interface CartItem {
  id: string;
  productId: number;
  quantity: number;
}

interface UseCartResult {
  cart: CartItem[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: Error | null;
  addToCart: ({
    productId,
    quantity,
  }: {
    productId: number;
    quantity: number;
  }) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateCartItemQuantity: (
    productId: number,
    quantity: number
  ) => Promise<void>;
  clearCart: () => Promise<void>;
  isProductInCart: (productId: number) => { inCart: boolean; quantity: number };
}

const useCart = (): UseCartResult => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, startTransition] = useTransition();

  const resetStates = useCallback(() => {
    setTimeout(() => {
      setIsSuccess(false);
      setIsError(false);
      setError(null);
    }, 2000); // Reset states after 2 seconds
  }, []);

  const fetchCart = useCallback(async () => {
    try {
      const fetchedCart = await getCart();
      setCart(fetchedCart);
      setIsError(false);
      setError(null);
    } catch (err) {
      setIsError(true);
      setError(err instanceof Error ? err : new Error("An error occurred"));
      resetStates();
    }
  }, [resetStates]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCartHandler = useCallback(
    async ({
      productId,
      quantity,
    }: {
      productId: number;
      quantity: number;
    }) => {
      startTransition(async () => {
        try {
          const updatedCart = await addToCart(productId, quantity);
          setCart(updatedCart);
          setIsError(false);
          setError(null);
          setIsSuccess(true);
          resetStates();
        } catch (err) {
          setIsError(true);
          setError(
            err instanceof Error ? err : new Error("Failed to add item to cart")
          );
          setIsSuccess(false);
          resetStates();
        }
      });
    },
    [resetStates]
  );

  const removeFromCartHandler = useCallback(
    async (productId: number) => {
      startTransition(async () => {
        try {
          const updatedCart = await removeFromCart(productId);
          setCart(updatedCart);
          setIsError(false);
          setError(null);
          setIsSuccess(true);
          resetStates();
        } catch (err) {
          setIsError(true);
          setError(
            err instanceof Error
              ? err
              : new Error("Failed to remove item from cart")
          );
          setIsSuccess(false);
          resetStates();
        }
      });
    },
    [resetStates]
  );

  const updateCartItemQuantityHandler = useCallback(
    async (productId: number, quantity: number) => {
      startTransition(async () => {
        try {
          const updatedCart = await updateCartItemQuantity(productId, quantity);
          setCart(updatedCart);
          setIsError(false);
          setError(null);
          setIsSuccess(true);
          resetStates();
        } catch (err) {
          setIsError(true);
          setError(
            err instanceof Error
              ? err
              : new Error("Failed to update item quantity")
          );
          setIsSuccess(false);
          resetStates();
        }
      });
    },
    [resetStates]
  );

  const clearCartHandler = useCallback(async () => {
    startTransition(async () => {
      try {
        await clearCart();
        setCart([]);
        setIsError(false);
        setError(null);
        setIsSuccess(true);
        resetStates();
      } catch (err) {
        setIsError(true);
        setError(
          err instanceof Error ? err : new Error("Failed to clear cart")
        );
        setIsSuccess(false);
        resetStates();
      }
    });
  }, [resetStates]);

  const isProductInCart = useCallback(
    (productId: number) => {
      const cartItem = cart.find((item) => item.productId === productId);
      return {
        inCart: !!cartItem,
        quantity: cartItem ? cartItem.quantity : 0,
      };
    },
    [cart]
  );

  return {
    cart,
    isLoading: isPending,
    isError,
    isSuccess,
    error,
    addToCart: addToCartHandler,
    removeFromCart: removeFromCartHandler,
    updateCartItemQuantity: updateCartItemQuantityHandler,
    clearCart: clearCartHandler,
    isProductInCart,
  };
};

export default useCart;
