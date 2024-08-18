"use client";
// UTILS
import useSWR from "swr";
// SERVICE
import { productsApi } from "@/services/products";

interface UseGetProductsOptions {
  ids?: number[];
}

const useGetCartProducts = (options: UseGetProductsOptions = {}) => {
  const { ids } = options;

  const fetcher = async (ids: number[]) => {
    const promises = ids.map((id) => productsApi.getProductById(id));
    return Promise.all(promises);
  };

  const {
    data: products = [],
    error,
    isLoading,
    mutate,
  } = useSWR(ids ? ["products", ...ids] : null, () => fetcher(ids || []));

  return {
    products,
    isLoading,
    isSuccess: !!products.length,
    isError: !!error,
    refetch: mutate,
  };
};

export default useGetCartProducts;
