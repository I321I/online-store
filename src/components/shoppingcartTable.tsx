"use client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductObject } from "@/types/product";
import { Session } from "next-auth";
import { useT } from "next-i18next/client";
import { useEffect, useMemo, useState } from "react";
import { ShoppingcartTableItem } from "./shoppingcartTableItem";
import { cn } from "@/lib/utils";
import { TFunction } from "i18next";

export const mergeProductsInformation = (
  dbCart: {
    id: string;
    quantity: number;
  }[],
  tProducts: TFunction<"products", undefined>,
) => {
  const data = dbCart.map((item) => {
    const localInformation = tProducts(item.id, {
      returnObjects: true,
    }) as ProductObject;
    const convertNumWithNtAndComma = (num: string) => {
      const strNumberWithComma = /([0-9,]+)/.exec(num)?.[0] ?? "";
      const strNumber = strNumberWithComma.replace(/,/g, "");
      return Number.parseInt(strNumber);
    };
    const subtotal =
      convertNumWithNtAndComma(localInformation.price) * item.quantity;
    return {
      ...item,
      ...localInformation,
      subtotal,
    };
  });
  return data;
};

export function ShoppingcartTable({
  session,
  emitTotal,
}: {
  session: Session;
  emitTotal: (total: number | string) => number | string;
}) {
  const [update, setUpdate] = useState(0);
  const debounce = <T extends (...args: unknown[]) => unknown>(
    func: T,
    wait = 500,
  ) => {
    let time: ReturnType<typeof setTimeout> | undefined;

    return (...arg: Parameters<T>) => {
      if (time != null) clearTimeout(time);
      time = setTimeout(() => {
        func(...arg);
      }, wait);
    };
  };

  const userId = session.user?.id;
  const [show, setShow] = useState<boolean>(false);

  const [cart, setCart] = useState<
    | {
        id: string;
        quantity: number;
      }[]
    | []
  >([]);

  useEffect(() => {
    const callCartApi = async () => {
      const response = await fetch(`/api/users/${userId}/cart`);
      const data = (await response.json()) as
        | {
            id: string;
            quantity: number;
          }[]
        | [];
      setCart(data);
      setShow(true);
    };
    callCartApi();
  }, [update, userId]);

  const { t } = useT("shoppingCart");
  const { t: tProducts } = useT("products");

  const data = mergeProductsInformation(cart, tProducts);
  const [total, setTotal] = useState<number | string>(
    data.reduce((sum, item) => sum + item.subtotal, 0),
  );

  const updateDebounce = useMemo(
    () =>
      debounce(() => {
        setUpdate((count) => count + 1);
      }, 500),
    [],
  );

  useEffect(() => {
    const tempTotol = data.reduce((sum, item) => sum + item.subtotal, 0);
    setTotal(tempTotol);
    emitTotal(tempTotol);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const updatePage = () => {
    const tempTotal = t("calculating");
    setTotal(tempTotal);
    emitTotal(tempTotal);
    updateDebounce();
  };

  return cart.length > 0 ? (
    <div className="flex flex-col justify-center gap-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-inherit">
              <TableHead className="text-center">{t("image")}</TableHead>
              <TableHead className="text-center">{t("product")}</TableHead>
              <TableHead className="text-center">{t("price")}</TableHead>
              <TableHead className="text-center">{t("quantity")}</TableHead>
              <TableHead className="text-center">{t("subtotal")}</TableHead>
              <TableHead className="text-center">{t("remove")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <ShoppingcartTableItem
                key={item.id}
                productInformation={item}
                updatePage={updatePage}
                session={session}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="m-auto flex w-fit flex-row text-lg text-gray-500">
        {typeof total === "number" ? (
          `${t("total")}NT$ ${total.toLocaleString()}`
        ) : (
          <>
            <p
              className={cn(
                `peer hidden ${typeof total === "number" ? "hidden" : "block"}`,
              )}
            >
              {total}
            </p>
            <span className="animate-dotAppear opacity-0 delay-150">.</span>
            <span className="animate-dotAppear opacity-0 delay-250">.</span>
            <span className="animate-dotAppear opacity-0 delay-350">.</span>
          </>
        )}
      </div>
    </div>
  ) : (
    show && (
      <p className="m-auto w-fit text-xl text-amber-800">{t("cartEmpty")}</p>
    )
  );
}
