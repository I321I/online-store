import { getT } from "next-i18next/server";
import { notFound } from "next/navigation";
import { PageBreadcrumbBasic } from "@/components/pageBreadcrumb";
import { ProductsList } from "@/components/productsList";
import { categories, type Categories } from "@/types/categories";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categories: Categories; lng: string }>;
}): Promise<Metadata> {
  const { lng } = await params;
  const { categories } = await params;
  const { t } = await getT("home", { lng });
  return {
    title: t(categories),
    description: t(`card-${categories}-content`),
    metadataBase: new URL("https://i321ionline.store"),
    alternates: {
      canonical: `/zh-Hant/${categories}`,
      languages: {
        "x-default": `/zh-Hant/${categories}`,
        "zh-Hant": `/zh-Hant/${categories}`,
        en: `/en/${categories}`,
      },
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ categories: Categories; lng: string }>;
}) {
  const { categories: category } = await params;
  if (!categories.find((item) => item === category)) return notFound();
  const { lng } = await params;
  const { t } = await getT("common", { lng });
  return (
    <div className="container-1920 flex flex-col gap-7 px-8 max-[1865px]:max-w-[1500px] max-[1262px]:max-w-[865px]">
      <div className="flex justify-center text-3xl">{t("curatedProducts")}</div>
      <PageBreadcrumbBasic />
      <ProductsList category={category} max={16} />
    </div>
  );
}
