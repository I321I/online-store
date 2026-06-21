import { auth } from "@/auth";
import ShoppingcartTabs from "@/components/shoppingcartTabs";
import { Metadata } from "next";
import { getT } from "next-i18next/server";
import { redirect } from "next/navigation";
export async function generateMetadata({
  params,
}: {
  params: { lng: string };
}): Promise<Metadata> {
  const { lng } = params;
  const { t } = await getT("shoppingCart", { lng });
  return {
    title: t("cart"),
    description:
      "登入後，頁面右上的ICON顯示購物車內的商品數量。並且在購物車內可直接透過按鈕快速增減數量，當下同步後端與資料庫。填寫收件者資料則由Zod檢查輸入格式，確保有效資料的傳遞。商品結帳後將從庫存扣除相應數量。",
    metadataBase: new URL("https://i321ionline.store"),
    alternates: {
      canonical: "/zh-Hant/shoppingcart",
      languages: {
        "x-default": "/zh-Hant/shoppingcart",
        "zh-Hant": "/zh-Hant/shoppingcart",
        en: "/en/shoppingcart",
      },
    },
  };
}

export default async function Page() {
  const session = await auth();
  if (session == null) redirect("/login");
  return <ShoppingcartTabs session={session} />;
}
