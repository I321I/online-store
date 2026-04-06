//CSR
// 'use client'
// import { useT } from "next-i18next/client"
// export default  function Home() {
//   const { t } = useT('home')
//   return <h1>{t('title')}</h1>
// }
//SSR
import { getT } from "next-i18next/server";
import Image from "next/image";
// import homeImage from "./images/home.jpg";
export default async function Home({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  // const { lng } = await params;
  // const { t } = await getT("home", { lng });
  // return <h1>{t("title")}</h1>;
  return (
    <div>
      <Image
        src="/images/home.jpg"
        width={100}
        height={100}
        sizes="100vw"
        alt="image of home page"
        loading="eager"
        className="w-auto h-auto"
      />
    </div>
  );
}
