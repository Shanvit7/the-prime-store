"use client";
// COMPONENTS
import Card from "@/components/products/card";
import NoProducts from "@/components/products/empty";
import ProductsError from "@/components/products/error";
import { ProductGridSkeleton } from "@/components/products/skeleton-group";
// HOOKS
import useGetProducts from "@/hooks/useGetProducts";
// TYPES
import { type Product } from "@/utils/types";

const Products = () => {
  const { products = [], isLoading = true, isError = false } =
    useGetProducts({
      limit: parseInt(process.env.NEXT_PUBLIC_PRODUCT_LIMIT as string) || 20,
      select: "id,title,price,thumbnail,images",
    }) ?? {};

  const isEmpty = products?.length === 0;

  if(isError) return <ProductsError />;
  if (isLoading) return <ProductGridSkeleton />;
  if (isEmpty) return <NoProducts />;

  return (
    <div className="grid grid-cols-1 gap-4 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {products.map(({ id, ...restData }: Product) => (
        <Card key={id} data={{ id, ...restData }} />
      ))}
    </div>
  );
};

export default Products;
