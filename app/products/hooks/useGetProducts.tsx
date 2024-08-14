"use client";
// UTILS
import useSWR from "swr";
// SERVICES
import { productsApi } from "@/services/products";
// CONSTANTS
import { ALL_PRODUCTS_API } from "@/utils/constants";

const useGetProducts = ({ limit= 30, skip = 0 } : { limit?: number, skip?: number }) => {
  const {
    data:{ 
      products = []
    } = {},
    error,
    isLoading = true,
    mutate,
  } = useSWR(ALL_PRODUCTS_API,async () => productsApi.getProductsList(limit,skip));
  return {
    products,
    isLoading,
    isSuccess: !!products,
    isError: !!error,
    refetch: mutate,
  };
};

export default useGetProducts;
