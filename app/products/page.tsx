'use client';

import useGetProducts from "../hooks/products/useGetProducts";
const Products = () => {
  const { data = []} = useGetProducts();
  return <h1>Products</h1>;
};
export default Products;
