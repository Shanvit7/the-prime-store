"use client";
// UTILS
import { getImageUrl } from "@/utils";
import { useState, FC } from "react";
// COMPONENTS
import AddToCartButton from "@/components/cart/buttons/add";
import RemoveFromCartButton from "@/components/cart/buttons/remove";
import VariantCircles from "@/components/products/variant-circles";
import Image from "next/image";
// HOOKS
import useCart from "@/hooks/useCart";
import useGetCurrency from "@/hooks/useGetCurrency";
// TYPES
import { type Product } from "@/utils/types";

interface CardProps {
  data: Product;
}

const Card: FC<CardProps> = ({ data }) => {
  const { isProductInCart } = useCart() ?? {};
  const { localCurrency, convertPrice, isLoading } = useGetCurrency() ?? {};
  const {
    id: productId = 0,
    images = [],
    title = "",
    price = 0,
    thumbnail = "",
  } = data;
  const { inCart = false } = isProductInCart(productId);

  // Fallback to thumbnail if images array is empty
  const defaultImage = images.length > 0 ? getImageUrl(images[0]) : thumbnail;
  // Retriving variation images, passed as prop to VariantCircles component
  const variantImages = images?.map((img) => getImageUrl(img));

  const [currentImage, setCurrentImage] = useState(defaultImage);
  const localPrice = isLoading ? "..." : convertPrice(price);

  return (
    <div className="relative flex flex-col h-full overflow-hidden rounded-lg shadow-xl group">
      <div className="relative bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 overflow-hidden rounded-t-lg h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72">
        <Image
          src={currentImage}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 transform group-hover:scale-105"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="relative flex flex-col flex-grow bg-white border-t border-gray-200 rounded-b-lg">
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-base font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
            {title}
          </h3>
          <div className="py-2">
            <VariantCircles
              images={variantImages}
              title={title}
              onImageHover={setCurrentImage}
              defaultImage={defaultImage}
            />
          </div>
          {/* Empty space to push the bottom section to the bottom */}
          <div className="flex-grow"></div>
        </div>

        <div className="p-4 bg-white border-t border-gray-200 rounded-b-lg flex flex-row items-center justify-between">
          <p className="text-base text-gray-700">
            {localCurrency} {localPrice}
          </p>
          <div className="mt-2 flex items-center space-x-2">
            {inCart ? (
              <RemoveFromCartButton productId={productId} />
            ) : (
              <AddToCartButton productId={productId} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
