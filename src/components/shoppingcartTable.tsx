"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductObject } from "@/types/product";
import { Trash2 } from "lucide-react";
import { Session } from "next-auth";
import { useT } from "next-i18next/client";
import { useEffect, useState } from "react";

export function ShoppingcartTable({ session }: { session: Session }) {
  const [remove, setRemove] = useState(0);
  const userId = session.user?.id;
  const [cart, setCart] = useState<
    | {
        id: string;
        quantity: number;
      }[]
    | []
  >([]);
  useEffect(() => {
    const callCartApi = async () => {
      const response = await fetch(`/api/users/${userId}/cart/`);
      const data = (await response.json()) as
        | {
            id: string;
            quantity: number;
          }[]
        | [];
      setCart(data);
    };
    callCartApi();
  }, [remove]);
  const { t } = useT("shoppingCart");
  const { t: tProducts } = useT("products");
  const convertNumWithNtAndComma = (num: string) => {
    const strNumberWithComma = /([0-9,]+)/.exec(num)?.[0] ?? "";
    const strNumber = strNumberWithComma.replace(/,/g, "");
    return Number.parseInt(strNumber);
  };
  const mergeProductsInformation = (
    shoppingcart: {
      id: string;
      quantity: number;
    }[],
  ) => {
    const data = shoppingcart.map((item) => {
      const localInformation = tProducts(item.id, {
        returnObjects: true,
      }) as ProductObject;
      return {
        ...item,
        ...localInformation,
        subtotal:
          convertNumWithNtAndComma(localInformation.price) * item.quantity,
      };
    });
    return data;
  };
  const data = mergeProductsInformation(cart);
  return (
    <div>
      <div className="mx-10 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-none">
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
              <TableRow key={item.id}>
                <TableCell className="text-center">{item.id}</TableCell>
                <TableCell className="text-center">{item.title}</TableCell>
                <TableCell className="text-center">{item.price}</TableCell>
                <TableCell className="text-center">{item.quantity}</TableCell>
                <TableCell className="text-center">
                  NT$ {item.subtotal.toLocaleString()}
                </TableCell>
                <TableCell className="flex justify-center">
                  <Trash2
                    className="cursor-pointer"
                    onClick={async () => {
                      await fetch(
                        `/api/users/${session.user?.id}/cart/${item.id}`,
                        { method: "DELETE" },
                      );
                      setRemove(remove + 1);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {t("total")}
    </div>
  );
}
