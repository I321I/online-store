"use client";
import { IntroCard } from "@/components/introCard";
import Image from "next/image";
//CSR
import { useT } from "next-i18next/client";
import Link from "next/link";
export default function Home() {
  const { t } = useT("home");
  return (
    <div className="container-1920 flex w-screen flex-col gap-8">
      <div className="relative h-[46vw]">
        <Image
          src="/images/home.jpg"
          sizes="100vw"
          alt="image of home page"
          loading="eager"
          priority
          fill
          className="pointer-events-none absolute left-0 mt-[-2] w-screen overflow-visible object-cover"
        />
      </div>
      <section className="flex flex-col gap-8">
        <h2 className="h2 pr-12 pl-8">{t("categories")}</h2>
        <div className="nowrap introCardScrollbar flex snap-x scroll-px-12 flex-row justify-start gap-8 overflow-x-scroll pr-12 pb-3 pl-8">
          <IntroCard
            t={t}
            category="storage"
            tailwindBgColor="bg-amber-900"
            direction="storage"
          />
          <IntroCard
            t={t}
            category="tables"
            tailwindBgColor="bg-[#CCAC90]"
            direction="tables"
          />
        </div>
      </section>
    </div>
  );
}
