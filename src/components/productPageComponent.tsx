"use client";
import { ProductObject } from "@/types/product";
import { useT } from "next-i18next/client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export default function ProductPageComponent() {
  const [amount, setAmount] = useState(1);
  const { t } = useT("common");
  const { t: tProduct } = useT("products");
  const path = usePathname();
  const segments = path.split("/");
  const lng = segments[1];
  const categoryPathName = segments[2];
  const product = segments[3];
  const productObject = tProduct(product, {
    returnObjects: true,
  }) as ProductObject;
  return (
    <div className="flex flex-row justify-between">
      <div className="flex w-99/200 flex-col gap-6 border-2 p-2 aspect-square">
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
        <p>{productObject.price}</p>
        <div className="flex h-10 w-full flex-row flex-wrap content-center justify-between bg-gray-200 px-2 align-middle">
          <p className="flex flex-wrap content-center text-lg">
            {t("quantity")}
          </p>
          <div className="flex flex-row gap-2">
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
          <Button className="flex h-10 rounded-none bg-gray-600 text-lg font-normal">
            {t("addToCart")}
          </Button>
          <Button className="flex h-10 rounded-none bg-gray-600 text-lg font-normal">
            {t("buyNow")}
          </Button>
        </div>
        {amount >= 9 && (
          <p className="text-amber-800">{t("whenQuantityLimit")}</p>
        )}
      </div>
      <button onClick={() => fetch(`/api/products/${product}`)}>get</button>
      
    </div>
  );
}
