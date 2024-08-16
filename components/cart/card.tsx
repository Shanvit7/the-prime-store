"use client";
import { FC } from "react";
// CORE-COMPONENTS
import Image from "next/image";
// HOOKS
import useGetProduct from "@/hooks/useGetProduct";
// ASSETS
import { TrashIcon } from "@heroicons/react/20/solid";

interface CartCardProps {
  productId: number;
}

const CartCard: FC<CartCardProps> = ({ productId }) => {
  const {
    product: { title = "...", price = 0, thumbnail = "", images = [] } = {},
  } = useGetProduct(productId) ?? {};
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
      <div className="flex flex-1 items-center justify-end gap-2">
        <form>
          <label htmlFor="quantity" className="sr-only">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            defaultValue="1"
            id="quantity"
            className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
          />
        </form>
        <button className="text-gray-600 transition hover:text-red-600">
          <span className="sr-only">Remove item</span>
          <TrashIcon />
        </button>
      </div>
    </li>
  );
};

export default CartCard;
