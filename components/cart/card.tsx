"use client";
// UTILS
import { FC, useState, useTransition } from "react";
// COMPONENTS
import Image from "next/image";
// HOOKS
import useCart from "@/hooks/useCart";
import useGetCurrency from "@/hooks/useGetCurrency";
// ASSETS
import { TrashIcon, PlusIcon, MinusIcon } from "@heroicons/react/20/solid";
// TYPES
import { type Product } from "@/utils/types";

interface CartCardProps {
  product: Product;
}

const Card: FC<CartCardProps> = ({ product }) => {
  const { id = 0, title = "...", price = 0, thumbnail = "" } = product ?? {};
  const { removeFromCart, updateCartItemQuantity, isProductInCart } =
    useCart() ?? {};

  const { localCurrency, convertPrice, isLoading } = useGetCurrency() ?? {};

  const { quantity: prevQuantity = 0 } = isProductInCart(id);

  const [quantity, setQuantity] = useState<number>(prevQuantity);
  const [isPending, startTransition] = useTransition();

  const handleRemove = () => {
    startTransition(async () => {
      try {
        await removeFromCart(id);
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
        await updateCartItemQuantity(id, newQuantity);
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
          await removeFromCart(id);
        } else {
          setQuantity(newQuantity);
          await updateCartItemQuantity(id, newQuantity);
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
          src={thumbnail}
          alt={title}
          fill
          className="rounded object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {isLoading ? (
          <p className="text-sm text-gray-600"> Loading...</p>
        ) : (
          <>
            <p className="text-sm text-gray-600">
              {localCurrency} {convertPrice(price)}
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
