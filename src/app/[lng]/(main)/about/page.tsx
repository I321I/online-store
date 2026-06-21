import { getT } from "next-i18next/server";
import { Categories } from "@/types/categories";
import Image from "next/image";
import aboutImage from "../../../../../public/images/about.jpg";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { lng: string };
}): Promise<Metadata> {
  const { lng } = params;
  const { t } = await getT("common", { lng });
  return {
    title: t("about"),
    description: t("aboutContent"),
    metadataBase: new URL("https://i321ionline.store"),
    alternates: {
      canonical: "/zh-Hant/about",
      languages: {
        "x-default": "/zh-Hant/about",
        "zh-Hant": "/zh-Hant/about",
        en: "/en/about",
      },
    },
    openGraph: {
      title: `${t("about")} - Donuts`,
      images: [
        {
          url: "/images/about.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ categories: Categories; lng: string }>;
}) {
  const { lng } = await params;
  const { t } = await getT("common", { lng });
  return (
    <div className="container-1920 flex min-h-[69.6vh] max-w-[800px] flex-col gap-10 px-8">
      <h2 className="flex justify-center text-3xl text-gray-700">
        {t("about")}
      </h2>
      <p className="px-2 text-lg font-light whitespace-pre-wrap text-gray-800">
        {t("aboutContent")}
      </p>
      <div className="relative h-80">
        <Image
          src={aboutImage}
          alt="about us image"
          placeholder="blur"
          sizes="(max-w-800px) 100vw, 800px"
          priority
          fetchPriority="high"
          className="pointer-events-none object-cover"
        />
      </div>
    </div>
  );
}
