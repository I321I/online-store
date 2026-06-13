"use client";
import { SiGithub } from "react-icons/si";
import { Button } from "./ui/button";
import { useT } from "next-i18next/client";
import { usePathname, useRouter } from "next/navigation";
export const Footer = () => {
  const { t } = useT("home");
  const pathname = usePathname();
  const router = useRouter();
  const switchLocal = (locale: string) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
  };
  return (
    <footer className="container-1920 mt-7 flex h-35 w-full flex-col justify-center border-t-2">
      <div className="flex h-full w-full grow flex-wrap content-center justify-around">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/I321I/online-store"
          id="github image"
          className="h-fit w-fit"
          onClick={() => console.log(123)}
        >
          <SiGithub size="40" />
        </a>
        <div className="flex flex-row">
          <Button
            variant="ghost"
            size="lg"
            className="box-border flex w-10 cursor-pointer p-0 text-3xl tracking-widest hover:bg-transparent"
            onClick={() => switchLocal("en")}
          >
            EN|
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="box-border flex w-10 cursor-pointer p-0 text-2xl hover:bg-transparent"
            onClick={() => switchLocal("zh-Hant")}
          >
            中
          </Button>
        </div>
      </div>
      <div className="mx-auto flex h-13 w-full flex-wrap content-center justify-center border-t-2 bg-[rgb(85,96,97)] text-xs text-nowrap text-white">
        Copyright © 2026 i321i. All RIGHTS RESERVED.
      </div>
    </footer>
  );
};
