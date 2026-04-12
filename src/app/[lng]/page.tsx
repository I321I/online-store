"use client";
import { IntroCard } from "@/components/introCard";
import Image from "next/image";
//CSR
import { useT } from "next-i18next/client";
export default function Home() {
  const { t } = useT("home");
  // }
  //SSR

  // import { getT } from "next-i18next/server";
  // export default async function Home({
  //   params,
  // }: {
  //   params: Promise<{ lng: string }>;
  // }) {
  // const { lng } = await params;
  // const { t } = await getT("home", { lng });
  return (
    <div className="flex w-screen flex-col gap-8">
      <Image
        src="/images/home.jpg"
        width={100}
        height={100}
        sizes="100vw"
        alt="image of home page"
        loading="eager"
        className="h-auto w-screen"
      />
      <section className="flex flex-col gap-8">
        <h2 className="h2 pr-12 pl-8">{t("categories")}</h2>
        <div className="nowrap flex snap-x scroll-px-12 flex-row justify-start gap-8 overflow-x-scroll pr-12 pb-3 pl-8">
          <IntroCard
            t={t}
            category="storage"
            tailwindBgColor="bg-amber-900"
          ></IntroCard>
          <IntroCard
            t={t}
            category="table"
            tailwindBgColor="bg-[#CCAC90]"
          ></IntroCard>
        </div>
      </section>
    </div>
  );
}
