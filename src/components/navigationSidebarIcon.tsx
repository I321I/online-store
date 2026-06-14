"use client";
import { Menu } from "lucide-react";
import { useSidebar } from "./ui/sidebar";

export const NavigationSidebarIcon = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <Menu
      className="relative -top-0.5 hidden h-[42%] cursor-pointer hover:shadow-[0_2px_0_0_black] active:not-aria-[haspopup]:translate-y-px max-[950px]:flex"
      onClick={toggleSidebar}
    />
  );
};
