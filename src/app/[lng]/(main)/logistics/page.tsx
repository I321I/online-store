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
        Donuts網站內未實際提供物流功能，操作購物車時不必擔心填寫的地址收到貨物。
        <br />
        <br />
        購物車中填寫的個人資料僅為模擬真實電子商務平台，而檢查填寫的資料使否符合格式，不會將資料流出，請安心嘗試。
        <br />
        為模擬真實電子商務平台的庫存機制，當購物車已加入產品，並且結帳流程跑完，將扣除產品庫存量，可在產品頁面確認。
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
