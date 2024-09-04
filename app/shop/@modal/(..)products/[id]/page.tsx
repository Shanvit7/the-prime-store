'use client';
// HOOKS
import useGetProduct from "@/hooks/useGetProduct";

const ProductPreview = ({ params } : { params:{ id: number} })=>{
    const { id } = params ?? {};
    const { product = {}, isLoading = true, isError = false } = useGetProduct(id);

    return <></>
};

export default ProductPreview;
