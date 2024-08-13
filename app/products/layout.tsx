import { type ReactNode } from "react";

const ProductsLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return <>{children}</>;
};

export default ProductsLayout;
