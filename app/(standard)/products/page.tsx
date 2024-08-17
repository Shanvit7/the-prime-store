"use client";
// COMPONENTS
import Card from "@/components/products/card";
import LoadingSkeletonGroup from "@/components/products/skeleton-group";
// HOOKS
import useGetProducts from "@/hooks/useGetProducts";

const Products = () => {
  const { products = [], isLoading = true } =
    useGetProducts({ limit: 20 }) ?? {};

  if (isLoading) {
    return <LoadingSkeletonGroup />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {products.map(({ id, ...restData }) => (
        <Card key={id} data={{ id, ...restData }} />
      ))}
    </div>
  );
};

export default Products;
