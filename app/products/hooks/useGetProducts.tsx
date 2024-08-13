"use client";
// UTILS
import useSWR from "swr";
// SERVICES
import { productsApi } from "@/services/products";
// CONSTANTS
import { ALL_PRODUCTS_API } from "@/utils/constants";

const useGetProducts = () => {
  const {
    data = [],
    error,
    isLoading = true,
    mutate,
  } = useSWR(ALL_PRODUCTS_API,async () => productsApi.getProductsList());
  return {
    data,
    isLoading,
    isSuccess: !!data,
    isError: !!error,
    refetch: mutate,
  };
};

export default useGetProducts;
