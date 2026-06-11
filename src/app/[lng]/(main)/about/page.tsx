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
      <p className="px-2 text-lg font-light text-gray-800">
        Donuts成立於2026年，提供諸多家飾以供選擇。
        <br />
        <br />
        網站內的產品均為模擬資料，可隨意瀏覽操作點擊。
        <br /> <br />
        登入/註冊方面，採取email或OAuth，使用時除了Email及ID外，未經使用者授權的第三方帳戶資料不會被開發者存取，請放心使用登入/註冊的功能。
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
