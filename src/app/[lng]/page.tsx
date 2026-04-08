//CSR
// 'use client'
// import { useT } from "next-i18next/client"
// export default  function Home() {
//   const { t } = useT('home')
//   return <h1>{t('title')}</h1>
// }
//SSR
import { IntroCard } from "@/components/introCard";
import { getT } from "next-i18next/server";
import Image from "next/image";

export default async function Home({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  const { t } = await getT("home", { lng });
  return (
    <div className="flex flex-col gap-8">
      <Image
        src="/images/home.jpg"
        width={100}
        height={100}
        sizes="100vw"
        alt="image of home page"
        loading="eager"
        className="h-auto w-auto"
      />
      <section className="flex flex-col gap-8 pr-12 pl-8">
        <h2 className="h2">{t("categories")}</h2>
        <div className="flex flex-row justify-start gap-8">
          <IntroCard t={t} category="storage"></IntroCard>
          <IntroCard t={t} category="table"></IntroCard>
        </div>
      </section>
    </div>
  );
}
