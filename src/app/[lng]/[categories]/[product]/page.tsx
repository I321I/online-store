import { PageBreadcrumbBasic } from "@/components/pageBreadcrumb";
import { getT } from "next-i18next/server";
import { notFound } from "next/navigation";

const createProducts = (productName: string, number: number) => {
  let maxNumber = number;
  if (number >= 100) maxNumber = 99;
  let result: string[] = [];
  for (let i = 1; i <= number; i++) {
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
    <div className="flex flex-col gap-7 px-8">
      <div className="flex justify-center pt-7 text-3xl">
        {t("curatedProducts")}
      </div>
      <PageBreadcrumbBasic />
      
    </div>
  );
}
