"use client";
import { ProductObject } from "@/types/product";
import { TableCell, TableRow } from "@/components/ui/table";
import { Minus, Plus, Trash2 } from "lucide-react";
import {  useState } from "react";
import { Session } from "next-auth";
import { Button } from "./ui/button";

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
  return (
    <TableRow key={item.id}>
      <TableCell className="text-center">{item.id}</TableCell>
      <TableCell className="text-center">{item.title}</TableCell>
      <TableCell className="text-center">{item.price}</TableCell>
      <TableCell>
        <div className="m-auto flex h-fit w-fit flex-row flex-wrap content-center justify-center gap-3 rounded-sm p-0">
          <Button
            variant={null}
            size="icon"
            disabled={quantity <= 0}
            className="h-6 w-3 cursor-pointer rounded-none"
            onClick={() =>
              quantity > 0 ? setQuantity(quantity - 1) : undefined
            }
          >
            <Minus />
          </Button>
          <p className="flex flex-wrap content-center">{quantity}</p>
          <Button
            variant={null}
            size="icon"
            disabled={quantity >= 9}
            className="h-6 w-3 cursor-pointer rounded-none"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus />
          </Button>
        </div>
      </TableCell>
      <TableCell className="text-center">
        NT$ {item.subtotal.toLocaleString()}
      </TableCell>
      <TableCell className="flex justify-center">
        <Trash2
          className="cursor-pointer"
          onClick={async () => {
            await fetch(`/api/users/${session.user?.id}/cart/${item.id}`, {
              method: "DELETE",
            });
            updatePage();
          }}
        />
      </TableCell>
    </TableRow>
  );
};
