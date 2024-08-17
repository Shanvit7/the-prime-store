"use client";
// UTILS
import { useEffect } from "react";
// HOOKS
import useCart from "@/hooks/useCart";
import useGetCurrency from "@/hooks/useGetCurrency";
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
  const fetchCurrencyData = useGetCurrency((state) => state.fetchCurrencyData);

  useEffect(() => {
    const initialize = async () => {
      await Promise.all([
        initializeCart(),
        fetchCurrencyData()
      ]);
    };

    initialize();
  }, [initializeCart, fetchCurrencyData]);

  return (
    <div className="grid grid-cols-5">
      <div className="col-span-5">{topbar}</div>
      <div className="col-span-5 justify-self-center my-8">{children}</div>
    </div>
  );
};

export default StandardLayout;