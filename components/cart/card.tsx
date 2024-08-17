"use client";

import { FC, useState, useTransition } from "react";
import Image from "next/image";
// HOOKS
import useGetProduct from "@/hooks/useGetProduct";
import useCart from "@/hooks/useCart";
import useGetCurrency from "@/hooks/useGetCurrency";
// ASSETS
import { TrashIcon, PlusIcon, MinusIcon } from "@heroicons/react/20/solid";

interface CartCardProps {
  productId: number;
}

const Card: FC<CartCardProps> = ({ productId }) => {
  const { removeFromCart, updateCartItemQuantity, isProductInCart } =
    useCart() ?? {};

  const { localCurrency, convertPrice, isLoading } = useGetCurrency() ?? {};

  const { quantity: prevQuantity = 0 } = isProductInCart(productId);

  const { product: { title = "...", price = 0, thumbnail = "" } = {} } =
    useGetProduct(productId) ?? {};

  const [quantity, setQuantity] = useState<number>(prevQuantity);
  const [isPending, startTransition] = useTransition();

  const handleRemove = () => {
    startTransition(async () => {
      try {
        await removeFromCart(productId);
      } catch (error) {
        console.error("Failed to remove item from cart:", error);
      }
    });
  };

  const handleIncrement = () => {
    startTransition(async () => {
      try {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        await updateCartItemQuantity(productId, newQuantity);
      } catch (error) {
        console.error("Failed to update item quantity:", error);
      }
    });
  };

  const handleDecrement = () => {
    startTransition(async () => {
      try {
        const newQuantity = quantity - 1;
        if (newQuantity <= 0) {
          await removeFromCart(productId);
        } else {
          setQuantity(newQuantity);
          await updateCartItemQuantity(productId, newQuantity);
        }
      } catch (error) {
        console.error("Failed to update item quantity:", error);
      }
    });
  };

  return (
    <li className="flex items-center gap-4 border-b border-gray-200 py-4">
      <div className="relative h-24 w-24 flex-shrink-0">
        <Image
          layout="fill"
          objectFit="cover"
          src={thumbnail}
          alt={title}
          className="rounded object-cover"
        />
      </div>
      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {isLoading ? (
          <p className="text-sm text-gray-600"> Loading...</p>
        ) : (
          <>
            <p className="text-sm text-gray-600">
              {localCurrency} {price?.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">
              Total: {localCurrency} {convertPrice(price * quantity)}
            </p>
          </>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrement}
            className="h-8 w-8 flex items-center justify-center rounded border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
            disabled={isPending}
          >
            <MinusIcon className="h-5 w-5" />
          </button>
          <span className="text-xs text-gray-600">{quantity}</span>
          <button
            onClick={handleIncrement}
            className="h-8 w-8 flex items-center justify-center rounded border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
            disabled={isPending}
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>
        <button
          onClick={handleRemove}
          className="text-gray-600 transition hover:text-red-600"
          disabled={isPending}
        >
          <span className="sr-only">Remove item</span>
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </li>
  );
};

export default Card;
