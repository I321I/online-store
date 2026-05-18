import { PageBreadcrumbBasic } from "@/components/pageBreadcrumb";
import ProductPageComponent from "@/components/productPageComponent";
import { getT } from "next-i18next/server";
import { notFound } from "next/navigation";

const createProducts = (productName: string, number: number) => {
  let num = number;
  if (number >= 100) num = 99;
  const result: string[] = [];
  for (let i = 1; i <= num; i++) {
    if (i < 10) {
      result.push(`${productName}${"0" + i}`);
      continue;
    }
    result.push(`${productName}${i}`);
  }
  return result;
};
export const products = [
  ...createProducts("table", 16),
  ...createProducts("storage", 16),
];
export default async function Page({
  params,
}: {
  params: Promise<{ lng: string; product: string }>;
}) {
  const { lng } = await params;
  const { t } = await getT("common", { lng });
  const { product } = await params;
  if (!products.find((item) => item === product)) return notFound();
  return (
    <div className="container-1920 flex flex-col gap-7 px-8">
      <div className="flex justify-center text-3xl">
        {t("curatedProducts")}
      </div>
      <PageBreadcrumbBasic />
      <ProductPageComponent />
    </div>
  );
}
