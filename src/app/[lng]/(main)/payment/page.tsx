import { getT } from "next-i18next/server";
import { Categories } from "@/types/categories";
import Image from "next/image";
import paymentImage from "../../../../../public/images/payment.jpg";

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
        {t("payment")}
      </h2>
      <p className="text-lg font-light text-gray-800 px-2">
        Donuts網站內未實際提供付款方式，因此操作購物車時不必擔心被要求支付金額。
        <br />
        <br />
        為模擬真實電子商務平台的金流機制，本網站導入了「依據訂單金額動態調整付款管道」的權限邏輯。
        <br />
        在真實的電商營運場景中，高金額訂單通常不會開放「貨到付款」等非即時扣款的物流管道，以規避惡意棄單、高額運費損失以及物流端代收現金的安全性風險。
        <br />
        為此，我將單筆購物車的結帳金額上限強制設定為80,000元，當使用者購物車內的累計結帳金額超過此門檻時無法結帳。
      </p>
      <Image
        src={paymentImage}
        alt="payment image"
        placeholder="blur"
        sizes="100vw"
        className="h-80 object-cover"
      />
    </div>
  );
}
