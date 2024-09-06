"use client";
// UTILS
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
// HOOKS
import useCart from "@/hooks/useCart";
import useGetCartProducts from "@/hooks/useGetCartProducts";
import useGetCurrency from "@/hooks/useGetCurrency";
// COMPONENTS
import Card from "@/components/cart/card";
import  LoadingSkeletonGroup from "@/components/cart/skeleton-group";
import EmptyCart from "@/components/cart/empty";
import StatusButton from "@/components/ui/buttons/status";

const Cart = () => {
  const router = useRouter() ?? {};
  // For simulating checkout
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const { cart = [] } = useCart() ?? {};
  const ids = useMemo(() => cart.map((item) => item.productId), [cart]);
  const { products = [], isLoading: isProductLoading = true } =
    useGetCartProducts({ ids, select: "title,price,thumbnail" }) ?? {};
  const {
    localCurrency,
    convertPrice,
    isLoading: isFormmatingPrice = true,
  } = useGetCurrency() ?? {};

  // Billing method of cart
  const { subtotal, discount, total } = useMemo(() => {
    const subtotal = cart.reduce((acc, cartItem) => {
      const product = products.find((p) => p.id === cartItem.productId);
      return acc + (product?.price ?? 0) * cartItem.quantity;
    }, 0);

    const discount = 0;
    const total = subtotal - discount;

    return { subtotal, discount, total };
  }, [cart, products]);

  const isEmpty = cart?.length === 0;

  const handleCheckout = () => {
    setIsLoading(true);
    // Simulate a delay for the checkout process
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      router.push("/shop/cart/checkout-success");
    }, 2000);
  };

  if (isEmpty) {
    return <EmptyCart />;
  }

  return (
    <section className="bg-white shadow-2xl p-4 sm:p-8">
      <div className="mx-auto max-w-screen-xl">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
              Your Cart
            </h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {isProductLoading ? (
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
                  <StatusButton
                    initialText="Checkout"
                    loadingText="Processing..."
                    successText="Order Placed!"
                    errorText="Failed"
                    onClick={handleCheckout}
                    isLoading={isLoading}
                    isSuccess={isSuccess}
                    className="min-w-32"
                    dataCy="checkout-button"
                  />
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
