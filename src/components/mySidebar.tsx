"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import { ChevronLeft, User2 } from "lucide-react";
import Link from "next/link";
import { useT } from "next-i18next/client";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import { categories } from "@/types/categories";

export const MySideBar = ({ lng }: { lng: string }) => {
  const { t } = useT("home");
  const { toggleSidebar } = useSidebar();
  const session = useSession();

  const pathname = usePathname();
  const router = useRouter();

  const segments = pathname.split("/");
  const switchLocal = (locale: string) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
  };
  return (
    <Sidebar className="z-100 overflow-auto">
      <SidebarHeader className="pt-9 pl-12">
        <SidebarMenu className="relative">
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
              tabIndex={-1}
              className="absolute top-1 aspect-square w-9"
            >
              <ChevronLeft className="!size-8 stroke-1" />
            </SidebarMenuAction>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="relative overflow-visible pt-5 pl-12">
        <SidebarGroup />
        <SidebarGroupLabel className="cursor-default p-0 pt-5 text-2xl opacity-70">
          {t("products")}
        </SidebarGroupLabel>
        <SidebarGroupContent className="pt-8">
          <SidebarMenu className="gap-5 text-xl">
            {categories.map((item) => (
              <SidebarMenuItem
                key={item}
                className="underline-offset-4 hover:underline"
              >
                <Link
                  href={[segments[0], segments[1], item].join("/")}
                  onClick={toggleSidebar}
                >
                  {t(item)}
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
        <SidebarMenu className="gap-5 pt-9">
          <SidebarMenuItem className="underline-offset-4 hover:underline">
            <Link
              key="sidebar about us"
              href={[segments[0], segments[1], "about"].join("/")}
              onClick={toggleSidebar}
            >
              {t("about")}
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem className="underline-offset-4 hover:underline">
            <Link
              key="sidebar logistics"
              href={[segments[0], segments[1], "logistics"].join("/")}
              onClick={toggleSidebar}
            >
              {t("logistics")}
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem className="underline-offset-4 hover:underline">
            <Link
              key="sidebar payment"
              href={[segments[0], segments[1], "payment"].join("/")}
              onClick={toggleSidebar}
            >
              {t("payment")}
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="pb-20">
        <SidebarMenu className="flx flex-col flex-wrap items-center gap-5">
          {session.data?.user != null ? (
            <SidebarMenuItem className="flex flex-col items-center gap-2">
              <div className="flex flex-row flex-wrap items-end">
                <User2 size={21} />
                <p className="flex w-auto max-w-34 cursor-default text-xl/5 break-all">
                  {session.data?.user?.name}
                </p>
              </div>
              <Button
                className="flex h-10 w-40 cursor-pointer rounded-none bg-gray-600 text-lg font-normal"
                onClick={() => {
                  signOut();
                  toggleSidebar();
                }}
              >
                {t("logout")}
              </Button>
            </SidebarMenuItem>
          ) : (
            <SidebarMenuItem className="">
              <Link href="/login">
                <Button className="flex h-10 w-40 cursor-pointer rounded-none bg-gray-600 text-lg font-normal">
                  {t("login")}
                </Button>
              </Link>
            </SidebarMenuItem>
          )}

          <SidebarMenuItem className="m-auto flex w-fit flex-row">
            <Button
              variant="ghost"
              size="lg"
              className="box-border flex w-auto cursor-pointer p-0 text-3xl tracking-widest hover:bg-transparent"
              onClick={() => {
                switchLocal("en");
                toggleSidebar();
              }}
            >
              EN |
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="box-border flex w-10 cursor-pointer p-0 text-2xl hover:bg-transparent"
              onClick={() => {
                switchLocal("zh-Hant");
                toggleSidebar();
              }}
            >
              中
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
