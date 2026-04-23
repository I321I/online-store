import { getT } from "next-i18next/server";
import { notFound } from "next/navigation";

// generateStaticParams
export const categories: string[] = ["tables", "storage"];
export default async function Page({
  params,
}: {
  params: Promise<{ categories: string; lng: string }>;
}) {
  const { categories: category } = await params;
  if (!categories.find((item) => item === category)) return notFound();
  const mockData = {};
  const { lng } = await params;
  const { t } = await getT("common", { lng });
  return (
    <div className="flex flex-col gap-7">
      <div className="flex justify-center pt-7 text-3xl">
        {t("curatedProducts")}
      </div>
      <div className="flex justify-center text-xl">123</div>
    </div>
  );
}
