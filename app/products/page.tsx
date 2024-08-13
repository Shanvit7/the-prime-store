'use client';
// HOOKS
import useGetProducts from "./hooks/useGetProducts";

const Products = () => {
  const { data = []} = useGetProducts();
  return <h1>Products</h1>;
};
export default Products;
