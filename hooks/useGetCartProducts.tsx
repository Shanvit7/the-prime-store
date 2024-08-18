"use client";
// UTILS
import useSWR from "swr";
// SERVICES
import { productsApi } from "@/services/products";
// CONSTANTS
import { CART_PRODUCTS_API } from "@/utils/constants";
// TYPES
interface UseGetProductsOptions {
  ids?: number[];
  select?: string;
}

const useGetCartProducts = (options: UseGetProductsOptions = {}) => {
  const { ids = [], select = "" } = options;

  const fetcher = async (ids: number[]) => {
    const promises = ids.map((productId) =>
      productsApi.getProductById({ productId, select })
    );
    return Promise.all(promises);
  };

  const {
    data: products = [],
    error,
    isLoading,
    mutate,
  } = useSWR(ids ? [CART_PRODUCTS_API, ...ids] : null, () =>
    fetcher(ids || [])
  );

  return {
    products,
    isLoading,
    isSuccess: !!products.length,
    isError: !!error,
    refetch: mutate,
  };
};

export default useGetCartProducts;
