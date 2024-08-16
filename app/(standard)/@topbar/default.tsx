"use client";
// UTILS
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/utils";
// CONSTANTS
import { TOPBAR_TABS } from "@/utils/constants";

interface TabProps {
  text: string;
  selected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  route: string;
}

const TopBar = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<string>(TOPBAR_TABS[0].route);
  const pathname = usePathname();

  useEffect(() => {
    const currentTab =
      TOPBAR_TABS.find((tab) => tab.route === pathname) || TOPBAR_TABS[0].route;
    setSelected(currentTab);
  }, [router]);

  const handleTabClick = (tabText: string, route: string) => () => {
    setSelected(tabText);
    router.push(route);
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 bg-white shadow-lg p-6">
      {TOPBAR_TABS.map(({ text, Icon, route }) => (
        <Tab
          text={text}
          selected={selected === text}
          setSelected={setSelected}
          Icon={Icon}
          route={route}
          key={text}
          onClick={handleTabClick(text, route)}
        />
      ))}
    </div>
  );
};

const Tab = ({
  text,
  selected,
  Icon,
  onClick,
}: TabProps & { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-2 rounded-md p-2 text-sm transition-all",
        selected ? "text-white" : "text-gray-600 hover:font-black"
      )}
    >
      <Icon className="z-10 h-5 w-5" />
      <p className="relative z-50">{text}</p>
      {selected && (
        <motion.span
          layoutId="tabs"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 rounded-sm bg-gradient-to-r from-yellow-500 to-yellow-600"
        />
      )}
    </button>
  );
};

export default TopBar;
