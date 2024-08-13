import { type ReactNode } from "react";

const ProductsLayout = ({
  topbar,
  filter,
  children,
}: Readonly<{
  topbar: ReactNode;
  filter: ReactNode;
  children: ReactNode;
}>) => {
  return (
    <div className="grid grid-cols-5">
      <div className="col-span-5">{topbar}</div>
      <div className="col-span-1">{filter}</div>
      <div className="col-span-4">{children}</div>
    </div>
  );
};

export default ProductsLayout;
