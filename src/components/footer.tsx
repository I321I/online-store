"use client";
import { useT } from "next-i18next/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiGithub } from "react-icons/si";
export const Footer = () => {
  const { t } = useT("home");
  const pathname = usePathname();
  const segments = pathname.split("/");

  return (
    <footer className="container-1920 mt-7 flex h-50 w-full flex-col justify-end border-t-2 max-[600px]:h-130">
      <div className="flex grow flex-row flex-wrap content-center justify-evenly max-[600px]:flex-col">
        <section className="flex flex-col gap-3">
          <h4 className="pb-3 text-center text-xl">Company</h4>
          <Link
            className="text-center opacity-70"
            href={[segments[0], segments[1], "about"].join("/")}
          >
            {t("about")}
          </Link>
        </section>
        <section className="flex flex-col gap-3">
          <h4 className="pb-3 text-center text-xl">Customer Service</h4>
          <Link
            className="text-center opacity-70"
            href={[segments[0], segments[1], "logistics"].join("/")}
          >
            {t("logistics")}
          </Link>
          <Link
            className="text-center opacity-70"
            href={[segments[0], segments[1], "payment"].join("/")}
          >
            {t("payment")}
          </Link>
        </section>
        <section className="flex flex-col gap-3">
          <h4 className="pb-3 text-center text-xl">Contact Us</h4>
          <a
            href="https://github.com/I321I/online-store"
            target="_blank"
            rel="noopener noreferrer"
            className="flex cursor-pointer flex-row justify-center text-center opacity-70"
          >
            <SiGithub className="h-auto" />
            I321I/online-store
          </a>
          <p className="text-center opacity-70">i321ixd@gmail.com</p>
        </section>
      </div>
      <div className="mx-auto flex h-13 w-full flex-wrap content-center justify-center border-t-2 bg-[rgb(85,96,97)] text-xs text-nowrap text-white">
        Copyright © 2026 i321i. All RIGHTS RESERVED.
      </div>
    </footer>
  );
};
