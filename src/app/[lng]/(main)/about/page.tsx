import { getT } from "next-i18next/server";
import { Categories } from "@/types/categories";
import Image from "next/image";
import aboutImage from "../../../../../public/images/about.jpg";

export default async function Page({
  params,
}: {
  params: Promise<{ categories: Categories; lng: string }>;
}) {
  const { lng } = await params;
  const { t } = await getT("common", { lng });
  return (
    <div className="container-1920 flex max-w-[800px] flex-col gap-10 px-8">
      <h2 className="flex justify-center text-3xl text-gray-700">
        {t("about")}
      </h2>
      <p className="px-2 text-lg font-light text-gray-800 whitespace-pre-wrap">
      {t("aboutContent")}
      </p>
      <Image
        src={aboutImage}
        alt="about us image"
        placeholder="blur"
        sizes="100vw"
        className="h-80 object-cover"
      />
    </div>
  );
}
