"use client";
import { FC, useState, useTransition } from "react";
import Image from "next/image";
// HOOKS
import useGetProduct from "@/hooks/useGetProduct";
import useCart from "@/hooks/useCart";
// ASSETS
import { TrashIcon, PlusIcon, MinusIcon } from "@heroicons/react/20/solid";

interface CartCardProps {
  productId: number;
}

const Card: FC<CartCardProps> = ({ productId }) => {
  const { removeFromCart, updateCartItemQuantity, isProductInCart } =
    useCart() ?? {};

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
    <li className="flex items-center gap-4 border border-solid">
      <div className="relative h-20 w-20">
        <Image
          layout="fill"
          objectFit="cover"
          src={thumbnail}
          alt={title}
          className="size-16 rounded object-cover"
        />
      </div>
      <div>
        <h3 className="text-sm text-gray-900">{title}</h3>
      </div>
      <div className="flex flex-1 items-center justify-end gap-2 px-4">
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
          className="text-gray-600 transition hover:text-red-600 size-5"
          disabled={isPending}
        >
          <span className="sr-only">Remove item</span>
          <TrashIcon />
        </button>
      </div>
    </li>
  );
};

export default Card;
