"use client";
// UTILS
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isPortalReady, setIsPortalReady] = useState(false);

  useEffect(() => {
    // Set the state to true when the component is mounted and the portal can be created
    setIsPortalReady(true);
  }, []);

  useEffect(() => {
    if (isPortalReady && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, [isPortalReady]);

  const onDismiss = () => {
    router.back();
  };

  if (!isPortalReady) return null;

  const modalRoot = document.getElementById("modal-root");

  // Checking if the modal root element exists
  if (!modalRoot) {
    console.error("The modal root element is not found in the DOM.");
    return null;
  };

  const handleClose = ()=> router.push('/shop/products');

  return createPortal(
    <div onClick={handleClose}>
      <dialog ref={dialogRef} onClose={onDismiss}>
        {children}
      </dialog>
    </div>,
    modalRoot
  );
};

export default Modal;
