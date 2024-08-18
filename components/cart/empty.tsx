// COMPONENTS
import Link from "next/link";
// ASSETS
import { ShoppingCartIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const EmptyCart = () => (
  <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <ShoppingCartIcon className="h-16 w-16 text-gray-400 animate-pulse mb-4" />
    <h2 className="text-xl font-semibold text-gray-800 sm:text-2xl lg:text-3xl">
      Your cart is empty
    </h2>
    <p className="mt-2 text-gray-600 text-center max-w-md sm:max-w-lg">
      Looks like you haven&apos;t added any products to your cart yet.
    </p>
    <Link
      href="/shop/products"
      className="mt-4 rounded-md flex flex-row items-center justify-center  bg-yellow-400 h-10 min-w-40 text-sm text-white transition hover:bg-yellow-500 group"
    >
      <ArrowLeftIcon className="h-5 w-5 inline-block mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
      Back to Shopping
    </Link>
  </div>
);

export default EmptyCart;
