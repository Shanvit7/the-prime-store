import { type ReactNode } from "react";

const CartsLayout = ({
  topbar,
  children,
}: Readonly<{
  topbar: ReactNode;
  filter: ReactNode;
  children: ReactNode;
}>) => {
  return (
    <div className="grid grid-cols-5">
      <div className="col-span-5">{topbar}</div>
      <div className="col-span-5 justify-self-center bg-white shadow-lg">{children}</div>
    </div>
  );
};

export default CartsLayout;
