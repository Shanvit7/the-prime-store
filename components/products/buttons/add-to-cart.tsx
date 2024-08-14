// CORE-COMPONENTS
import StatusButton from "@/components/buttons/status";
// ASSETS
import { ShoppingCartIcon } from "@heroicons/react/20/solid";

const AddToCartButton = () => {
  return (
    <StatusButton
      initialText="Add to Cart"
      successText="Added!"
      successIcon={ShoppingCartIcon}
    />
  );
};

export default AddToCartButton;
