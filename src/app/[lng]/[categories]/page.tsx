import { getT } from "next-i18next/server";
import { notFound } from "next/navigation";
import { PageBreadcrumbBasic } from "@/components/pageBreadcrumb";
import { ProductsList } from "@/components/productsList";
import { Categories } from "@/types/categories";

// generateStaticParams
export const categories = ["tables", "storage"] as const;

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
    <div className="container-1920 flex flex-col gap-7 px-8 max-[1865px]:max-w-[1500px]">
      <div className="flex justify-center text-3xl">{t("curatedProducts")}</div>
      <PageBreadcrumbBasic />
      <ProductsList category={category} max={16} className="max-[1865px]:gap-4 max-[1262px]:gap-2" />
    </div>
  );
}
