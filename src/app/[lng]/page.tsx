//CSR
// 'use client'
// import { useT } from "next-i18next/client"
// export default  function Home() {
//   const { t } = useT('home')
//   return <h1>{t('title')}</h1>
// }

//SSR
import { getT } from "next-i18next/server";
export default async function Home({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  const { t } = await getT("home", { lng });
  return <h1>{t("title")}</h1>;
}
