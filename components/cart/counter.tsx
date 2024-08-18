"use client";
// UTILS
import { FC } from "react";
import { cn } from "@/utils";
// HOOKS
import useCart from "@/hooks/useCart";

interface CounterProps {
  className?: string;
}

const Counter: FC<CounterProps> = ({ className }) => {
  const { cart = [] } = useCart() ?? {};
  const totalCount = cart?.reduce((acc, item) => acc + (item?.quantity ?? 0), 0);
  if (cart?.length === 0) {
    return;
  }
  return (
    <div
      className={cn(
        "relative flex items-center justify-center w-4 h-4 rounded-full text-white font-bold text-xs",
        className
      )}
    >
      {totalCount}
    </div>
  );
};

export default Counter;
