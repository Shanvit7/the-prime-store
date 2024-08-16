"use client";
// CORE-COMPONENTS
import StatusButton from "@/components/ui/buttons/status";
// HOOKS
import useCart from "@/hooks/useCart";
// ASSETS
import { ShoppingCartIcon } from "@heroicons/react/20/solid";

const AddToCartButton = ({ productId }: { productId: number }) => {
  const {
    addToCart,
    isLoading = false,
    isSuccess = false,
    isError = false,
  } = useCart() ?? {};

  const handleOnClick = () => {
    addToCart({ productId, quantity: 1 });
  };

  return (
    <StatusButton
      initialText="Add to Cart"
      loadingText="Adding..."
      successText="Added!"
      errorText="Failed to add to cart."
      successIcon={ShoppingCartIcon}
      onClick={handleOnClick}
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
      disabled={isLoading}
    />
  );
};

export default AddToCartButton;
