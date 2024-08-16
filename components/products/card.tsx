"use client";

// CORE-COMPONENTS
import Image from "next/image";
// COMPONENTS
import AddToCartButton from "@/components/cart/buttons/add";
import RemoveFromCartButton from "@/components/cart/buttons/remove";
// HOOKS
import useCart from "@/hooks/useCart";
// UTILS
import { getImageUrl } from "@/utils";

const Card = ({ data = {} }) => {
  const { isProductInCart, cart = [] } = useCart() ?? {};
  const { id: productId = 0, images = [], title = "", price = 0 } = data;
  const { inCart, quantity } = isProductInCart(productId);
  const primaryImage = getImageUrl(images?.[0]);
  const secondaryImage =
    images.length > 1 ? getImageUrl(images[1]) : primaryImage;

  return (
    <div className="group relative block overflow-hidden h-full shadow-xl rounded-lg">
      <div className="relative bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 shadow-lg h-56 lg:h-64 overflow-hidden">
        <Image
          src={primaryImage}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-all duration-300 
                     group-hover:scale-110 opacity-100 group-hover:opacity-0"
          layout="fill"
          objectFit="cover"
        />
        <Image
          src={secondaryImage}
          alt={`${title} - alternate view`}
          className="absolute inset-0 h-full w-full object-cover transition-all duration-300 
                     group-hover:scale-110 opacity-0 group-hover:opacity-100"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="relative border border-gray-200 bg-white p-6 h-1/2 rounded-b-lg">
        <h3 className="mt-4 text-lg font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
          {title}
        </h3>
        <div className="flex items-center justify-between mt-4">
          <p className="tracking-wide text-gray-700">${price}</p>
          {inCart && quantity > 0 ? (
            <RemoveFromCartButton productId={productId} />
          ) : (
            <AddToCartButton productId={productId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
