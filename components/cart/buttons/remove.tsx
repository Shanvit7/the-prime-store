"use client";
// CORE-COMPONENTS
import StatusButton from "@/components/ui/buttons/status";
// HOOKS
import useCart from "@/hooks/useCart";
// ASSETS
import { ShoppingCartIcon } from "@heroicons/react/20/solid";

const RemoveFromCartButton = ({ productId }: { productId: number }) => {
  const {
    removeFromCart,
    isLoading = false,
    isSuccess = false,
    isError = false,
  } = useCart() ?? {};

  const handleOnClick = () => {
    removeFromCart(productId);
  };

  return (
    <StatusButton
      initialText="Remove from cart"
      loadingText="Removing..."
      successText="Removed!"
      errorText="Failed to remove from cart."
      successIcon={ShoppingCartIcon}
      onClick={handleOnClick}
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
      disabled={isLoading}
    />
  );
};

export default RemoveFromCartButton;
