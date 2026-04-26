"use client";

import { useT } from "next-i18next/client";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function ProductPageComponent() {
  const { t } = useT("products");
  const path = usePathname();
  const segments = path.split("/");
  const categoryPathName = segments[2];
  const productNum = /([0-9]+)$/.exec(segments[3])?.[1];
  let num;
  if (productNum) num = parseInt(productNum);
  console.log(num);
  return (
    <div>
      <div className="box-border flex w-49/100 border-2 border-solid p-2">
        {/* sm */}
        <Image
          src={`/images/${categoryPathName}/${num}.jpg`}
          width={0}
          height={0}
          sizes="100vw"
          alt={`image of product ${num}`}
          loading="eager"
          className="aspect-square h-auto w-auto overflow-hidden object-cover"
        />
      </div>
    </div>
  );
}
