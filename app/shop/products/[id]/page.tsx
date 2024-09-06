"use client";
// UTILS
import { getImageUrl } from "@/utils";
import { useState, useEffect } from "react";
// COMPONENTS
import Image from "next/image";
import Details from "@/components/products/details";
import Reviews from "@/components/products/reviews";
import Ratings from "@/components/products/ratings";
import VariantCircles from "@/components/products/variant-circles";
import AddToCartButton from "@/components/cart/buttons/add";
import RemoveFromCartButton from "@/components/cart/buttons/remove";
import { ProductSkeleton } from "@/components/products/skeleton-group";
// HOOKS
import useGetProduct from "@/hooks/useGetProduct";
import useCart from "@/hooks/useCart";
import useGetCurrency from "@/hooks/useGetCurrency";

const Product = ({ params }: { params: { id: string } }) => {
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
    reviews = [],
    images = [],
    thumbnail = "",
  } = product ?? {};
  const {
    localCurrency,
    convertPrice,
    isLoading: isFormmatingPrice = true,
  } = useGetCurrency() ?? {};
  // Fallback to thumbnail if images array is empty
  const defaultImage = images.length > 0 ? getImageUrl(images[0]) : thumbnail;
  // Retriving variation images, passed as prop to VariantCircles component
  const variantImages = images?.map((img: string) => getImageUrl(img));
  const [currentImage, setCurrentImage] = useState(defaultImage);

  useEffect(() => {
    setCurrentImage(defaultImage);
  }, [defaultImage]);

  if (isLoading) {
    return <ProductSkeleton />;
  }

  return (
    <main className="container px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
      <section className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="relative h-[50vh] md:h-auto md:w-1/2">
            <Image
              src={currentImage}
              alt={title}
              fill
              priority
              className="rounded object-cover p-4"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 30vw, 20vw"
            />
          </div>

          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <div className="py-2">
              <VariantCircles
                images={variantImages}
                title={title}
                onImageHover={setCurrentImage}
                defaultImage={defaultImage}
              />
            </div>
            <p className="text-gray-600 mb-4">{brand}</p>
            <div className="flex items-center mb-4">
              <Ratings rating={rating} />
              <span className="ml-2 text-gray-600">({rating.toFixed(1)})</span>
            </div>
            <p className="text-2xl font-bold mb-4">
              {isFormmatingPrice
                ? "..."
                : `${localCurrency} ${convertPrice(price)}`}
            </p>
            <p className="text-gray-700 mb-4">{description}</p>
            {inCart ? (
              <RemoveFromCartButton productId={productId} />
            ) : (
              <AddToCartButton productId={productId} />
            )}
          </div>
        </div>
      </section>

      <section className="mt-8">
        <Details {...product} />
      </section>

      <section id="reviews">
        <Reviews reviews={reviews} />
      </section>
    </main>
  );
};

export default Product;
