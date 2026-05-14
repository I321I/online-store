"use client";
import { usePathname } from "next/navigation";

export default function NavigationMargin() {
  const path = usePathname();
  const segments = path.split("/");
  const isHome = !(segments[2] ? true : false);
  if (isHome) return;
  return <div className="h-7"></div>;
}
