"use client";
import { useState, useTransition } from "react";
// CORE-COMPONENTS
import StatusButton from "@/components/ui/buttons/status";
// HOOKS
import useCart from "@/hooks/useCart";
// ASSETS
import { ShoppingCartIcon } from "@heroicons/react/20/solid";

const RemoveFromCartButton = ({ productId }: { productId: number }) => {
  const { removeFromCart } = useCart() ?? {};

  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleOnClick = () => {
    setIsSuccess(false);
    setIsError(false);
    startTransition(async () => {
      try {
        await removeFromCart(productId);
        setIsSuccess(true);
      } catch (error) {
        setIsError(true);
      }
    });
  };

  return (
    <StatusButton
      initialText="Remove from cart"
      loadingText="Removing..."
      successText="Removed!"
      errorText="Failed to remove from cart."
      successIcon={ShoppingCartIcon}
      onClick={handleOnClick}
      isLoading={isPending}
      isSuccess={isSuccess}
      isError={isError}
      disabled={isPending}
    />
  );
};

export default RemoveFromCartButton;
