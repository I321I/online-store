"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import { ChevronLeft, Plus, User2 } from "lucide-react";
import Link from "next/link";
import { useT } from "next-i18next/client";
import { categories } from "@/app/[lng]/(main)/[categories]/page";
import { usePathname } from "next/navigation";

export const MySideBar = ({ lng }: { lng: string }) => {
  const { t } = useT("home");
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const segments = pathname.split("/");

  return (
    <Sidebar className="z-100">
      <SidebarHeader className="pt-4 pl-4">
        <SidebarMenu>
          <SidebarMenuItem className="relative">
            <Link
              href={`/${lng}`}
              className="font-serif text-5xl/10"
              onClick={() => toggleSidebar()}
            >
              {t("title")}
            </Link>
            <SidebarMenuAction
              onClick={toggleSidebar}
              className="absolute top-3"
            >
              <ChevronLeft />
            </SidebarMenuAction>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="relative pl-4">
        <SidebarGroup />
        <SidebarGroupLabel className="cursor-default p-0 pt-5 text-2xl">
          {t("products")}
        </SidebarGroupLabel>
        <SidebarGroupContent className="pt-6">
          <SidebarMenu className="gap-3 text-xl">
            {categories.map((item) => (
              <Link
                key={item}
                href={[segments[0], segments[1], item].join("/")}
                onClick={toggleSidebar}
              >
                <SidebarMenuItem className="underline-offset-4 hover:underline">
                  {t(item)}
                </SidebarMenuItem>
              </Link>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <User2 /> Username
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
