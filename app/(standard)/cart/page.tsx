"use client";
// UTILS
import { useMemo } from "react";
// HOOKS
import useCart from "@/hooks/useCart";
import useGetCartProducts from "@/hooks/useGetCartProducts";
import useGetCurrency from "@/hooks/useGetCurrency";
// COMPONENTS
import Card from "@/components/cart/card";
import LoadingSkeletonGroup from "@/components/cart/skeleton-group";
import Link from "next/link";

const Cart = () => {
  const { cart = [] } = useCart() ?? {};
  const ids = useMemo(() => cart.map((item) => item.productId), [cart]);
  const { products = [], isLoading = true } = useGetCartProducts({ ids }) ?? {};
  const {
    localCurrency,
    convertPrice,
    isLoading: isFormmatingPrice = true,
  } = useGetCurrency() ?? {};

  // Billing logic
  const { subtotal, discount, total } = useMemo(() => {
    const subtotal = cart.reduce((acc, cartItem) => {
      const product = products.find((p) => p.id === cartItem.productId);
      return acc + (product?.price ?? 0) * cartItem.quantity;
    }, 0);

    const discount = 0;
    const total = subtotal - discount;

    return { subtotal, discount, total };
  }, [cart, products]);

  return (
    <section className="bg-white shadow-2xl">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Your Cart
            </h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {isLoading ? (
                <LoadingSkeletonGroup />
              ) : (
                products.map(({ id, ...restData } = {}) => (
                  <Card key={id} product={{ id, ...restData }} />
                ))
              )}
            </ul>
            <div className="mt-8 flex flex-col justify-between border-t border-gray-100 pt-8 lg:flex-row lg:justify-center">
              <div className="w-full max-w-lg space-y-4">
                <dl className="space-y-0.5 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <dt>Subtotal</dt>
                    <dd>
                      {isFormmatingPrice
                        ? "..."
                        : `${localCurrency} ${convertPrice(subtotal)}`}
                    </dd>
                  </div>

                  <div className="flex justify-between">
                    <dt>Discount</dt>
                    <dd>
                      {isFormmatingPrice
                        ? "..."
                        : `${localCurrency} ${convertPrice(discount)}`}
                    </dd>
                  </div>

                  <div className="flex justify-between !text-base font-medium py-6">
                    <dt>Total</dt>
                    <dd className="font-semibold">
                      {isFormmatingPrice
                        ? "..."
                        : `${localCurrency} ${convertPrice(total)}`}
                    </dd>
                  </div>
                </dl>

                <div className="flex justify-end">
                  <Link
                    href="/checkout"
                    className="block rounded bg-yellow-400 px-5 py-3 text-sm text-white transition hover:bg-yellow-500"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
