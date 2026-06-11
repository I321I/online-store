import { getT } from "next-i18next/server";
import { Categories } from "@/types/categories";
import Image from "next/image";
import aboutImage from "../../../../../public/images/logistics.jpg";

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
        {t("logistics")}
      </h2>
      <p className="px-2 text-lg font-light text-gray-800">
        Donuts網站內未實際提供物流功能，因此操作購物車時不必擔心填寫的地址收到貨物。
        <br />
        <br />
        
      </p>
      <Image
        src={aboutImage}
        alt="logistics image"
        placeholder="blur"
        sizes="100vw"
        className="h-90 object-cover object-[25%_70%]"
      />
    </div>
  );
}
