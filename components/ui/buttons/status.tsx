'use client';
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { cn } from "@/utils";

interface StatusButtonProps {
  initialText: string;
  loadingText?: string;
  successText?: string;
  errorText?: string;
  successIcon?: React.ElementType;
  loadingIcon?: React.ElementType;
  errorIcon?: React.ElementType;
  onClick?: () => void;
  className?: string;
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  disabled?: boolean;
}

const StatusButton: React.FC<StatusButtonProps> = ({
  initialText,
  loadingText = "Please Wait",
  successText = "Success",
  errorText = "Error",
  successIcon: SuccessIcon = CheckCircleIcon,
  loadingIcon: LoadingIcon = ArrowPathIcon,
  errorIcon: ErrorIcon = XCircleIcon,
  onClick,
  className,
  isLoading = false,
  isSuccess = false,
  isError = false,
  disabled = false,
}) => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (isLoading) setStatus("loading");
    else if (isSuccess) setStatus("success");
    else if (isError) setStatus("error");
    else setStatus("idle");
  }, [isLoading, isSuccess, isError]);

  const handleClick = () => {
    if (!disabled && !isLoading && onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={cn(
        "group relative h-10 min-w-40 overflow-hidden rounded-md bg-yellow-400 px-6 text-sm font-semibold text-white transition-colors duration-300 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={status}
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.075 }}
          className={cn("flex items-center justify-center gap-1")}
        >
          {status === "loading" && (
            <LoadingIcon className="h-4 w-4 animate-spin" />
          )}
          {status === "success" && (
            <motion.span
              className="h-fit w-fit"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.075, type: "spring" }}
            >
              <SuccessIcon className="h-4 w-4 fill-white stroke-yellow-500 group-hover:stroke-yellow-600" />
            </motion.span>
          )}
          {status === "error" && (
            <ErrorIcon className="h-4 w-4 fill-white stroke-red-500" />
          )}
          
          {status === "loading" ? loadingText :
           status === "success" ? successText :
           status === "error" ? errorText :
           initialText}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default StatusButton;