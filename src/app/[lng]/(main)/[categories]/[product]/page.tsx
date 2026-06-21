import { auth } from "@/auth";
import { PageBreadcrumbBasic } from "@/components/pageBreadcrumb";
import ProductPageComponent from "@/components/productPageComponent";
import { ProductObject } from "@/types/product";
import { Metadata } from "next";
import { getT } from "next-i18next/server";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ product: string; lng: string; categories: string }>;
}): Promise<Metadata> {
  const { lng } = await params;
  const { categories } = await params;
  const { product } = await params;
  const { t } = await getT("products", { lng });
  const productObject = t(product, { returnObjects: true }) as ProductObject;
  return {
    title: productObject.title,
    description: productObject.description,
    metadataBase: new URL("https://i321ionline.store"),
    alternates: {
      canonical: `/zh-Hant/${categories}/${product}`,
      languages: {
        "x-default": `/zh-Hant/${categories}/${product}`,
        "zh-Hant": `/zh-Hant/${categories}/${product}`,
        en: `/en/${categories}/${product}`,
      },
    },
    openGraph: {
      title: `${productObject.title} - Donuts`,
      images: [
        {
          url: `/images/${categories}/${product}.jpg`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

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
  const session = await auth();
  if (!products.find((item) => item === product)) return notFound();
  return (
    <div className="container-1920 flex w-full flex-col gap-7 px-8">
      <div className="flex justify-center text-3xl">{t("curatedProducts")}</div>
      <PageBreadcrumbBasic />
      <ProductPageComponent session={session} />
    </div>
  );
}
