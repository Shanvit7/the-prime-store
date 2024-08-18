"use client";
import { useState, useTransition } from "react";
// COMPONENTS
import StatusButton from "@/components/ui/buttons/status";
// HOOKS
import useCart from "@/hooks/useCart";
// ASSETS
import { ShoppingCartIcon } from "@heroicons/react/20/solid";

const AddToCartButton = ({ productId }: { productId: number }) => {
  const { addToCart } = useCart() ?? {};

  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleOnClick = () => {
    setIsSuccess(false);
    setIsError(false);
    startTransition(async () => {
      try {
        await addToCart(productId, 1);
        setIsSuccess(true);
      } catch (error) {
        setIsError(true);
      }
    });
  };

  return (
    <StatusButton
      initialText="Add to cart"
      loadingText="Adding..."
      successText="Added!"
      errorText="Failed to add to cart."
      successIcon={ShoppingCartIcon}
      onClick={handleOnClick}
      isLoading={isPending}
      isSuccess={isSuccess}
      isError={isError}
      disabled={isPending}
    />
  );
};

export default AddToCartButton;
