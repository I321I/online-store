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
  }, [remove, userId]);
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
  const data = mergeProductsInformation(cart);
  const total = data.reduce((sum, item) => sum + item.subtotal, 0);
  return (
    cart.length > 0 && (
      <div className="flex flex-col justify-center gap-4">
        <div className="rounded-md border">
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
        <p className="m-auto w-fit text-lg text-gray-500">
          {`${t("total")}NT$ ${total.toLocaleString()}`}
        </p>
      </div>
    )
  );
}
