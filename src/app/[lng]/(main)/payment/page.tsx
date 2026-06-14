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
    <div className="container-1920 flex min-h-[69.6vh] max-w-[800px] flex-col gap-10 px-8">
      <h2 className="flex justify-center text-3xl text-gray-700">
        {t("payment")}
      </h2>
      <p className="px-2 text-lg font-light whitespace-pre-wrap text-gray-800">
        {t("paymentContent")}
      </p>
      <Image
        src={paymentImage}
        alt="payment image"
        placeholder="blur"
        sizes="100vw"
        className="pointer-events-none h-80 object-cover"
      />
    </div>
  );
}
