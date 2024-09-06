"use client";
// UTILS
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isPortalReady, setIsPortalReady] = useState(false);

  useEffect(() => {
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

  if (!modalRoot) {
    console.error("The modal root element is not found in the DOM.");
    return null;
  }

  const handleClose = () => router.push("/shop/products");

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.dialog
          ref={dialogRef}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 500 }}
          onClick={(e) => e.stopPropagation()}
          onClose={onDismiss}
        >
          {children}
        </motion.dialog>
      </motion.div>
    </AnimatePresence>,
    modalRoot
  );
};

export default Modal;
