import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { cn } from "@/utils";

const wait = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

interface StatusButtonProps {
  initialStatus?: "Please Wait" | "Continue" | "Success";
  successIcon?: React.ElementType;
  loadingIcon?: React.ElementType;
  onStatusChange?: (status: "Please Wait" | "Continue" | "Success") => void;
  initialText?: string;
  successText?: string;
  onClick?: () => void;
  className?: string; 
}

const StatusButton: React.FC<StatusButtonProps> = ({
  initialStatus = "Continue",
  successIcon: SuccessIcon = CheckCircleIcon,
  loadingIcon: LoadingIcon = ArrowPathIcon,
  onStatusChange,
  initialText = "Continue",
  successText = "Success",
  onClick,
  className, // Destructure className
}) => {
  const [status, setStatus] = useState<"Please Wait" | "Continue" | "Success">(initialStatus);
  const isEnabled = !status || status === "Continue";

  const changeStatus = async () => {
    if (!isEnabled) {
      return;
    }

    setStatus("Please Wait");
    onStatusChange?.("Please Wait");
    await wait(1500);

    setStatus("Success");
    onStatusChange?.("Success");
    await wait(1500);

    setStatus("Continue");
    onStatusChange?.("Continue");
  };

  return (
    <button
      onClick={() => {
        changeStatus();
        onClick?.();
      }}
      disabled={!isEnabled}
      className={cn(
        "group relative h-10 min-w-40 overflow-hidden rounded-md bg-yellow-400 px-6 text-sm font-semibold text-white transition-colors duration-300 hover:bg-yellow-500",
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
          {status === "Success" && (
            <motion.span
              className="h-fit w-fit"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.075, type: "spring" }}
            >
              <SuccessIcon className="h-4 w-4 fill-white stroke-yellow-500 group-hover:stroke-yellow-600" />
            </motion.span>
          )}

          {status === "Please Wait" ? (
            <LoadingIcon className="h-4 w-4 animate-spin" />
          ) : status === "Success" ? (
            successText
          ) : (
            initialText
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default StatusButton;

