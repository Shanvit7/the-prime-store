"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    };
  }, []);

  const onDismiss = () => {
    router.back();
  };

  return createPortal(
    <div>
      <dialog ref={dialogRef} onClose={onDismiss}>
        {children}
        <button onClick={onDismiss} />
      </dialog>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default Modal;

