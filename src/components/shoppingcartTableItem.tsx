"use client";
import { ProductObject } from "@/types/product";
import { TableCell, TableRow } from "@/components/ui/table";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Session } from "next-auth";
import { Button } from "./ui/button";
import Image from "next/image";

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
  const updateQuantity = useMemo(
    () =>
      debounce(async (targetQuantity, productId) => {
        if (targetQuantity === 0) {
          await fetch(`/api/users/${session.user?.id}/cart/${productId}`, {
            method: "DELETE",
          });
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
        <TableRow key={product.id}>
          <TableCell className="flex justify-center p-1">
            <Image
              src={`/images/${catogoryPathName}/${product.id}.jpg`}
              width={0}
              height={0}
              alt={`image of product ${product.id}`}
              sizes="100vw"
              loading="eager"
              className="aspect-square h-13 w-13 overflow-hidden object-cover"
            />
          </TableCell>
          <TableCell className="text-center">{product.title}</TableCell>
          <TableCell className="text-center">{product.price}</TableCell>
          <TableCell>
            <div className="m-auto flex h-fit w-fit flex-row flex-wrap content-center justify-center gap-3 rounded-sm p-0">
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
          <TableCell className="w-[20%] text-center">
            NT$ {product.subtotal.toLocaleString()}
          </TableCell>
          <TableCell>
            <Trash2
              className="m-auto cursor-pointer"
              onClick={() => {
                setDeleted(true);
                fetch(`/api/users/${session.user?.id}/cart/${product.id}`, {
                  method: "DELETE",
                });
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
