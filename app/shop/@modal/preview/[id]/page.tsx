"use client";
// UTILS
import { useState, useEffect, MouseEvent, MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/utils";
// COMPONENTS
import Modal from "./modal";
import Link from "next/link";
import Image from "next/image";
import Ratings from "@/components/products/ratings";
import VariantCircles from "@/components/products/variant-circles";
import AddToCartButton from "@/components/cart/buttons/add";
import RemoveFromCartButton from "@/components/cart/buttons/remove";
import { ProductPreviewSkeleton } from "@/components/products/skeleton-group";
// HOOKS
import useGetProduct from "@/hooks/useGetProduct";
import useCart from "@/hooks/useCart";
import useGetCurrency from "@/hooks/useGetCurrency";
// ASSETS
import { XMarkIcon } from "@heroicons/react/20/solid";

const ProductPreview = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = params ?? {};
  const productId = Number(id);
  const { isProductInCart } = useCart() ?? {};
  const { inCart = false } = isProductInCart(productId);
  const {
    product = {},
    isLoading = true,
    isError = false,
  } = useGetProduct(productId) ?? {};
  const {
    brand = "...",
    title = "...",
    description = "",
    price = 0,
    rating = 0,
    images = [],
    thumbnail = "",
  } = product ?? {};
  const {
    localCurrency,
    convertPrice,
    isLoading: isFormattingPrice = true,
  } = useGetCurrency() ?? {};

  const defaultImage = images.length > 0 ? getImageUrl(images[0]) : thumbnail;
  const variantImages = images?.map((img: string) => getImageUrl(img));
  const [currentImage, setCurrentImage] = useState(defaultImage);

  useEffect(() => {
    setCurrentImage(defaultImage);
  }, [defaultImage]);

  const disableClick: MouseEventHandler = (e: MouseEvent) =>
    e.stopPropagation();

  const handleClose: MouseEventHandler = (e: MouseEvent) => {
    disableClick(e);
    router.push("/shop/products");
  };

  if (isLoading) {
    return (
      <Modal>
        <ProductPreviewSkeleton />
      </Modal>
    );
  }

  return (
    <Modal>
      <div
        data-cy="product-modal"
        className="flex items-center justify-center z-50"
      >
        <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <button
            onClick={handleClose}
            data-cy="modal-close"
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="size-5" />
          </button>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative h-64 md:h-80 md:w-1/2">
              <Image
                src={currentImage}
                alt={title}
                fill
                priority
                className="rounded object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                data-cy="product-preview-image"
              />
            </div>
            <div className="md:w-1/2">
              <h2
                data-cy="product-preview-title"
                className="text-2xl font-bold mb-2"
              >
                {title}
              </h2>
              <p data-cy="product-preview-brand" className="text-gray-600 mb-2">
                {brand}
              </p>
              <div className="flex items-center mb-2">
                <Ratings rating={rating} />
                <span className="ml-2 text-gray-600">
                  ({rating.toFixed(1)})
                </span>
              </div>
              <p
                data-cy="product-preview-price"
                className="text-xl font-semibold mb-2"
              >
                {isFormattingPrice
                  ? "..."
                  : `${localCurrency} ${convertPrice(price)}`}
              </p>
              <div className="py-2 mb-2">
                <VariantCircles
                  images={variantImages}
                  title={title}
                  onImageHover={setCurrentImage}
                  defaultImage={defaultImage}
                />
              </div>
              <p className="text-gray-700 mb-4 line-clamp-3">{description}</p>
              <div className="flex gap-4 mb-4">
                {inCart ? (
                  <RemoveFromCartButton productId={productId} />
                ) : (
                  <AddToCartButton productId={productId} />
                )}
                <Link
                  href={`/shop/products/${productId}`}
                  className="flex items-center px-6 text-sm font-semibold rounded-md bg-gray-200"
                  onClick={disableClick}
                >
                  See More Details
                </Link>
              </div>
              <Link
                href={`/shop/products/${productId}#reviews`}
                className="text-blue-600 hover:underline"
                onClick={disableClick}
              >
                See Reviews
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductPreview;
