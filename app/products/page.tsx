"use client";
// COMPONENTS
import Card from "@/components/products/card";
import LoadingSkeletonGroup from "../../components/products/skeleton-group";
// HOOKS
import useGetProducts from "@/hooks/useGetProducts";

const Products = () => {
  const {  products = [] , isLoading = true} = useGetProducts({ limit: 10 }) ?? {};
  if(isLoading){
    return <LoadingSkeletonGroup />
  };
  return (
    <div className="grid grid-cols-3 gap-2">
      {products.map(({ id, ...restData })=>(<Card key={id} data={{id,...restData}} />))}
    </div>
  );
};
export default Products;
