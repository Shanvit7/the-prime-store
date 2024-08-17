"use client";
// UTILS
import { useEffect } from "react";
// HOOKS
import useCart from "@/hooks/useCart";
// TYPES
import { type ReactNode } from "react";

const StandardLayout = ({
  topbar,
  children,
}: Readonly<{
  topbar: ReactNode;
  children: ReactNode;
}>) => {
  const initializeCart = useCart((state) => state.initializeCart);

  useEffect(() => {
    const fetchAndInitializeCart = async () => {
      await initializeCart();
    };

    fetchAndInitializeCart();
  }, [initializeCart]);

  return (
    <div className="grid grid-cols-5">
      <div className="col-span-5">{topbar}</div>
      <div className="col-span-5 justify-self-center my-8">{children}</div>
    </div>
  );
};

export default StandardLayout;
