"use client";
// COMPONENTS
import Card from "@/components/products/card";
import LoadingSkeletonGroup from "@/components/products/skeleton-group";
// HOOKS
import useGetProducts from "@/hooks/useGetProducts";

const Products = () => {
  const {  products = [] , isLoading = true} = useGetProducts({ limit: 20 }) ?? {};
  if(isLoading){
    return <LoadingSkeletonGroup />
  };
  return (
    <div className="grid grid-cols-4 gap-4 px-8">
      {products.map(({ id, ...restData })=>(<Card key={id} data={{id,...restData}} />))}
    </div>
  );
};
export default Products;
