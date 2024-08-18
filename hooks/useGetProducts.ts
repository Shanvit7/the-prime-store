"use client";
// UTILS
import useSWR from "swr";
// SERVICES
import { productsApi } from "@/services/products";
// CONSTANTS
import { ALL_PRODUCTS_API } from "@/utils/constants";

interface UseGetProductsOptions {
  limit?: number;
  skip?: number;
  select?: string; // for querying only needed attributes 
};

const useGetProducts = (options: UseGetProductsOptions = {}) => {
  const { limit = parseInt(process.env.NEXT_PUBLIC_PRODUCT_LIMIT as string), skip = 0, select } = options;

  const {
    data: { products = [] } = {},
    error,
    isLoading = true,
    mutate,
  } = useSWR(
    [ALL_PRODUCTS_API, limit, skip, select],
    () => productsApi.getProductsList({ limit, skip, select })
  );

  return {
    products,
    isLoading,
    isSuccess: !!products,
    isError: !!error,
    refetch: mutate,
  };
};

export default useGetProducts;