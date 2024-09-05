"use client";
// UTILS
import { useEffect } from "react";
import { usePathname } from "next/navigation";
// HOOKS
import useCart from "@/hooks/useCart";
import useGetCurrency from "@/hooks/useGetCurrency";
// TYPES
import { type ReactNode } from "react";

const ShopLayout = ({
  modal,
  topbar,
  children,
}: Readonly<{
  modal: ReactNode;
  topbar: ReactNode;
  children: ReactNode;
}>) => {
  const pathname = usePathname();
  // Both are local storage synced with server on app initilization
  const initializeCart = useCart((state) => state.initializeCart);
  const fetchCurrencyData = useGetCurrency((state) => state.fetchCurrencyData);

  useEffect(() => {
    const initialize = async () => {
      await Promise.all([initializeCart(), fetchCurrencyData()]);
    };

    initialize();
  }, [initializeCart, fetchCurrencyData]);
  const showModal = pathname.startsWith("/shop/preview/");
  return (
    <>
      <div className="relative grid grid-cols-5">
        <div className="sticky top-0 z-50 col-span-5">{topbar}</div>{" "}
        <div className="col-span-5 justify-self-center my-8">{children}</div>
      </div>
      {showModal && modal}
      <div id="modal-root" />
    </>
  );
};

export default ShopLayout;
