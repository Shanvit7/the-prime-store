'use client';
import useSWR from "swr";
import { productsApi } from "@/app/services/products";


const useGetProducts = () => {
  const { data, error , isLoading, mutate } = useSWR(
    '/api/all-products',
    () => productsApi.getProductsList()
  );

  return {
    data,
    isLoading,
    isSuccess: !!data,
    isError: !!error,
    refetch: mutate,
  };
};

export default useGetProducts;
