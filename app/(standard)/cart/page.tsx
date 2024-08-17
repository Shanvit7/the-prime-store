"use client";
// UTILS
import { useEffect, useState } from "react";
// HOOKS
import useCart from "@/hooks/useCart";
import useGetCurrency from "@/hooks/useGetCurrency";
// COMPONENTS
import Card from "@/components/cart/card";
import LoadingSkeletonGroup from "@/components/cart/skeleton-group";
import Link from "next/link";

const Cart = () => {
  const { cart = [] } = useCart() ?? {};
  const [isLoading, setIsLoading] = useState(true);
  const {
    localCurrency,
    convertPrice,
    isLoading: isFormmatingPrice = true,
  } = useGetCurrency() ?? {};

  // Simulate loading delay as data being fetched from local storage / redis db
  useEffect(() => {
    const loadCartData = async () => {
      // Simulate a delay for fetching data
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoading(false);
    };

    loadCartData();
  }, []);

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
                cart.map(({ productId, id }) => (
                  <Card key={id} productId={productId} />
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
                        : `${localCurrency} ${convertPrice(250)}`}
                    </dd>
                  </div>

                  <div className="flex justify-between">
                    <dt>Discount</dt>
                    <dd> N / A</dd>
                  </div>

                  <div className="flex justify-between !text-base font-medium py-6">
                    <dt>Total</dt>
                    <dd className="font-semibold">
                      {isFormmatingPrice
                        ? "..."
                        : `${localCurrency} ${convertPrice(200)}`}
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
