"use client";
// UTILS
import { motion } from "framer-motion";
// ASSETS
import { ArrowPathIcon } from "@heroicons/react/24/outline";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-6 py-8 text-gray-800 dark:text-white">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="mb-8"
      >
        <ArrowPathIcon className="h-16 w-16 text-yellow-400" />
      </motion.div>

      <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-pulse">
        Please Wait...
      </h1>

      <p className="text-lg md:text-xl text-balance">
        Grabbing the freshest deals, just for you! 🛒✨
      </p>
    </div>
  );
};

export default Loading;
