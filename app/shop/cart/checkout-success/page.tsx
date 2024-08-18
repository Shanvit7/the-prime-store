"use client";
// UTILS
import { useEffect } from "react";
import { motion } from "framer-motion";
// HOOKS
import useCart from "@/hooks/useCart";
// COMPONENTS
import Link from "next/link";
// ASSETS
import { CheckCircleIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Checkout = () => {
  const { clearCart } = useCart() ?? {};
  useEffect(()=>{
    clearCart();
  },[]);
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto my-8 text-center"
    >
      <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto" />
      <h2 className="mt-4 text-2xl font-bold text-gray-800">
        Checkout Successful!
      </h2>
      <p className="mt-2 text-gray-600">
        Thank you for your purchase. Your order is being processed.
      </p>
      <Link
        href="/shop/products"
        className="inline-flex items-center mt-6 bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg transition group"
      >
        <ArrowLeftIcon className="h-5 w-5 inline-block mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
        Back to Shopping
      </Link>
    </motion.div>
  );
};

export default Checkout;
