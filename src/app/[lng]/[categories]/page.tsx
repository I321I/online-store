import { getT } from "next-i18next/server";
import { notFound } from "next/navigation";
import { PageBreadcrumbBasic } from "@/components/pageBreadcrumb";
import { ProductsList } from "@/components/productsList";

// generateStaticParams
export const categories = ["tables", "storage"] as const;
export type Categories = (typeof categories)[number];
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
    <div className="flex flex-col gap-7 px-8">
      <div className="flex justify-center pt-7 text-3xl">
        {t("curatedProducts")}
      </div>
      <PageBreadcrumbBasic />
      <ProductsList category={category} rows={4} columns={4} />
    </div>
  );
}
