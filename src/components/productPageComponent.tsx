"use client";
import { ProductObject } from "@/types/product";
import { useT } from "next-i18next/client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { ProductPageFailedAlert } from "./productPageFailedAlert";
import { ProductPageSuccessAlert } from "./productPageSuccessAlert";
import { useGetQuantityQuery } from "@/lib/cartItemQuantity";

export default function ProductPageComponent({
  session,
}: {
  session: Session | null;
}) {
  const [amount, setAmount] = useState(1);
  const [stock, setStock] = useState<number | string>("");
  const [warning, setWarning] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { t } = useT("common");
  const { t: tProduct } = useT("products");
  const path = usePathname();
  const router = useRouter();
  const segments = path.split("/");
  const lng = segments[1];
  const categoryPathName = segments[2];
  const product = segments[3];
  const productObject = tProduct(product, {
    returnObjects: true,
  }) as ProductObject;
  const { refetch } = useGetQuantityQuery(session?.user?.id ?? "", {
    skip: !session?.user?.id,
  });

  useEffect(() => {
    const callStockApi = async () => {
      const response = await fetch(`/api/products/${product}`);
      const data = await response.json();
      setStock(data.stock);
    };
    callStockApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex flex-row justify-between">
      <div className="flex aspect-square w-99/200 flex-col gap-6 border-2 p-2">
        {/* sm */}
        <Image
          src={`/images/${categoryPathName}/${product}.jpg`}
          width={0}
          height={0}
          sizes="100vw"
          alt={`image of product ${product}`}
          loading="eager"
          className="aspect-square h-auto w-auto overflow-hidden object-cover"
        />
      </div>
      <div className="box-border flex w-99/200 flex-col gap-5">
        <h1 className={`${lng === "zh-Hant" ? "-ml-0.5" : undefined} text-2xl`}>
          {productObject.title}
        </h1>
        <p>
          {`[${t("productDescription")}]`}
          <br />
          {productObject.description}
        </p>
        <div>
          {productObject.price}
          <br />
          <p className="text-gray-500">
            {t("storage")}
            {stock}
          </p>
        </div>
        <div className="flex h-10 w-full flex-row flex-wrap content-center justify-between bg-gray-200 px-2 align-middle">
          <p className="flex flex-wrap content-center text-lg">
            {t("quantity")}
          </p>
          <div className="flex flex-row flex-wrap content-center gap-2">
            <Button
              variant="default"
              size="icon"
              disabled={amount === 1}
              className="h-6 w-6 rounded-full bg-gray-600"
              onClick={() => (amount > 1 ? setAmount(amount - 1) : undefined)}
            >
              <Minus strokeWidth={4} />
            </Button>
            <p>{amount}</p>
            <Button
              variant="default"
              size="icon"
              disabled={amount >= 9}
              className="h-6 w-6 rounded-full bg-gray-600"
              onClick={() => setAmount(amount + 1)}
            >
              <Plus strokeWidth={4} />
            </Button>
          </div>
        </div>
        <div className="flex flex-row flex-nowrap gap-3">
          <Button
            className="flex h-10 cursor-pointer rounded-none bg-gray-600 text-lg font-normal"
            onClick={async () => {
              if (!session) router.push(`/${lng}/login`);
              const callItemApi = await fetch(
                `/api/users/${session?.user?.id}/cart/${product}`,
              );
              const data: { id: string; quantity: number } =
                await callItemApi.json();
              if (data.quantity + amount > 0 && data.quantity + amount < 10) {
                await fetch(`/api/users/${session?.user?.id}/cart/${product}`, {
                  method: "PATCH",
                  body: JSON.stringify({ quantity: amount }),
                });
                setSuccess(true);
                refetch();
                return;
              }
              setWarning(true);
            }}
          >
            {t("addToCart")}
          </Button>
          <ProductPageFailedAlert warning={warning} setWarning={setWarning} />
          <ProductPageSuccessAlert success={success} setSuccess={setSuccess} />
          <Button
            className="flex h-10 cursor-pointer rounded-none bg-gray-600 text-lg font-normal"
            onClick={async () => {
              if (!session) router.push(`/${lng}/login`);
              const callItemApi = await fetch(
                `/api/users/${session?.user?.id}/cart/${product}`,
              );
              const data: { id: string; quantity: number } =
                await callItemApi.json();
              if (data.quantity + amount > 0 && data.quantity + amount < 10) {
                await fetch(`/api/users/${session?.user?.id}/cart/${product}`, {
                  method: "PATCH",
                  body: JSON.stringify({ quantity: amount }),
                });
                router.push(`/${lng}/shoppingcart`);
                return;
              }
              setWarning(true);
            }}
          >
            {t("buyNow")}
          </Button>
        </div>
        {amount >= 9 && (
          <p className="text-amber-800">{t("whenQuantityLimit")}</p>
        )}
      </div>
    </div>
  );
}
