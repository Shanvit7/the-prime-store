"use client";
// UTILS
import useSWR from "swr";
// SERVICES
import { productsApi } from "@/services/products";
// CONSTANTS
import { PRODUCT_API } from "@/utils/constants";

// This hook is not used anywhere, for future feature additions
const useGetProduct = (productId: number) => {
    const {
      data: product = {},
      error,
      isLoading = true,
      mutate,
    } = useSWR(`${PRODUCT_API}/${productId}`,async () => productsApi.getProductById({ productId }));
    return {
      product,
      isLoading,
      isSuccess: !!product,
      isError: !!error,
      refetch: mutate,
    };
  };
  
  export default useGetProduct;
  