"use client";
// UTILS
import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/utils";
// COMPONENTS
import Image from "next/image";
import Link from "next/link";
import Counter from "@/components/cart/counter";
// CONSTANTS
import { TOPBAR_TABS } from "@/utils/constants";

const TopBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedRoute, setSelectedRoute] = useState<string>(pathname);
  const controls = useAnimation();

  // Handle route change and animate tab transition
  const handleTabClick = useCallback(
    (route: string) => async () => {
      if (route !== selectedRoute) {
        // Trigger animation for the selected tab
        await controls.start({
          scale: 0.9,
          opacity: 0.5,
          transition: { duration: 0.3 },
        });
        router.push(route);
        setSelectedRoute(route);
        await controls.start({
          scale: 1,
          opacity: 1,
          transition: { duration: 0.3 },
        });
      }
    },
    [router, selectedRoute, controls]
  );

  useEffect(() => {
    setSelectedRoute(pathname);
  }, [pathname]);

  return (
    <div className="grid grid-cols-3 items-center bg-white shadow-lg p-4">
      {/* Logo */}
      <div className="flex justify-start items-center">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="The Prime Store Logo"
            width={200}
            height={40}
          />
        </Link>
      </div>
      {/* Empty column to keep grid structure */}
      <div />
      {/* Tabs */}
      <div className="flex justify-end items-center">
        <div className="flex space-x-4">
          {TOPBAR_TABS.map(({ text, Icon, route }) => (
            <Tab
              text={text}
              selected={selectedRoute === route}
              onClick={handleTabClick(route)}
              Icon={Icon}
              key={route}
              controls={controls}
              showCounter={route === "/shop/cart"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Tab = ({
  text,
  selected,
  Icon,
  onClick,
  controls,
  showCounter,
}: {
  text: string;
  selected: boolean;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick: () => void;
  controls: any;
  showCounter: boolean;
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-2 rounded-md p-2 text-sm transition-all",
        selected ? "text-white" : "text-gray-600 hover:font-black"
      )}
      animate={controls}
    >
      <div className="relative flex items-center">
        <Icon className="z-10 h-5 w-5" />
        {showCounter && (
          <span className="relative z-20 bottom-1 right-1">
            <Counter
              className={cn(
                selected ? "bg-white text-yellow-400" : "bg-yellow-500"
              )}
            />
          </span>
        )}
      </div>
      <p className="relative z-50">{text}</p>
      {selected && (
        <motion.span
          layoutId="tabs"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 rounded-sm bg-gradient-to-r from-yellow-500 to-yellow-600"
        />
      )}
    </motion.button>
  );
};

export default TopBar;
