"use client";
import { ProductObject } from "@/types/product";
import { TableCell, TableRow } from "@/components/ui/table";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Session } from "next-auth";
import { Button } from "./ui/button";
import Image from "next/image";
import { useGetQuantityQuery } from "@/lib/cartItemQuantity";
import { useT } from "next-i18next/client";

interface ProductInformation extends ProductObject {
  id: string;
  quantity: number;
  subtotal: number;
}

export const ShoppingcartTableItem = ({
  productInformation,
  updatePage,
  session,
}: {
  productInformation: ProductInformation;
  updatePage: () => void;
  session: Session;
}) => {
  const { t } = useT("shoppingCart");
  const item = { ...productInformation };
  const [quantity, setQuantity] = useState<number>(item.quantity);
  const debounce = <T extends (...args: unknown[]) => unknown>(
    fn: T,
    wait = 300,
  ) => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    return (...args: Parameters<T>) => {
      if (timer != null) clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, wait);
    };
  };
  const { refetch } = useGetQuantityQuery(session.user?.id ?? "", {
    skip: !session.user?.id,
  });
  const notExecuteFirstTime = useRef<boolean>(true);
  const updateQuantity = useMemo(
    () =>
      debounce(async (targetQuantity, productId) => {
        if (notExecuteFirstTime.current) {
          notExecuteFirstTime.current = false;
          return;
        }
        if (targetQuantity === 0) {
          await fetch(`/api/users/${session.user?.id}/cart/${productId}`, {
            method: "DELETE",
          });
          refetch();
          return;
        }
        await fetch(`/api/users/${session.user?.id}/cart/${productId}`, {
          method: "PATCH",
          body: JSON.stringify({ targetQuantity }),
        });
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  useEffect(() => {
    updateQuantity(quantity, item.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);
  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);
  const [isDeleted, setDeleted] = useState<boolean>(false);
  const catogoryPathName =
    /[A-Za-z]+/.exec(item.id)?.[0] === "table" ? "tables" : "storage";
  const result = (product: ProductInformation, isDeleted: boolean) => {
    if (isDeleted === false)
      return (
        <TableRow
          key={product.id}
          className="max-[600px]:flex max-[600px]:flex-col max-[600px]:gap-4"
        >
          <TableCell className="flex justify-center p-1 max-[600px]:justify-between max-[600px]:px-4">
            <h4 className="hidden flex-wrap content-center max-[600px]:flex">
              {t("image")}
            </h4>
            <Image
              src={`/images/${catogoryPathName}/${product.id}.jpg`}
              width={0}
              height={0}
              alt={`image of product ${product.id}`}
              sizes="100vw"
              loading="eager"
              className="pointer-events-none aspect-square h-13 w-13 min-w-13 object-cover"
            />
          </TableCell>
          <TableCell className="text-center max-[600px]:flex max-[600px]:justify-between max-[600px]:px-4">
            <h4 className="hidden max-[600px]:flex">{t("product")}</h4>
            {product.title}
          </TableCell>
          <TableCell className="text-center max-[600px]:flex max-[600px]:justify-between max-[600px]:px-4">
            <h4 className="hidden max-[600px]:flex">{t("price")}</h4>
            {product.price}
          </TableCell>
          <TableCell className="max-[600px]:flex max-[600px]:justify-between max-[600px]:px-4">
            <h4 className="hidden max-[600px]:flex">{t("quantity")}</h4>
            <div className="m-auto flex h-fit w-fit flex-row flex-nowrap content-center justify-center gap-3 rounded-sm p-0 max-[600px]:m-0">
              <Button
                variant={null}
                size="icon"
                disabled={quantity <= 0}
                className="h-6 w-3 cursor-pointer rounded-none"
                onClick={() => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  quantity > 0 ? setQuantity(quantity - 1) : undefined;
                  updatePage();
                }}
              >
                <Minus />
              </Button>
              <p className="flex flex-wrap content-center">{quantity}</p>
              <Button
                variant={null}
                size="icon"
                disabled={quantity >= 9}
                className="h-6 w-3 cursor-pointer rounded-none"
                onClick={() => {
                  setQuantity(quantity + 1);
                  updatePage();
                }}
              >
                <Plus />
              </Button>
            </div>
          </TableCell>
          <TableCell className="w-[20%] text-center max-[600px]:flex max-[600px]:w-full max-[600px]:justify-between max-[600px]:px-4">
            <h4 className="hidden max-[600px]:flex">{t("subtotal")}</h4>
            NT$ {product.subtotal.toLocaleString()}
          </TableCell>
          <TableCell className="max-[600px]:flex max-[600px]:justify-between max-[600px]:px-4">
            <h4 className="hidden flex-wrap content-center font-medium max-[600px]:flex">
              {t("remove")}
            </h4>
            <Trash2
              className="m-auto cursor-pointer max-[600px]:m-0"
              onClick={async () => {
                setDeleted(true);
                await fetch(
                  `/api/users/${session.user?.id}/cart/${product.id}`,
                  {
                    method: "DELETE",
                  },
                );
                refetch();
                updatePage();
              }}
            />
          </TableCell>
        </TableRow>
      );
    return <></>;
  };
  return result(item, isDeleted);
};
