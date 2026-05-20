"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Session } from "next-auth";
import { useEffect, useState } from "react";

export function ShoppingcartTable({ session }: { session: Session }) {
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
  }, []);
  return (
    <Table>
      <TableCaption>結帳金額</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>圖示</TableHead>
          <TableHead>商品名稱</TableHead>
          <TableHead>單價</TableHead>
          <TableHead>數量</TableHead>
          <TableHead>價格</TableHead>
          <TableHead>刪除</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cart.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell>{invoice.id}</TableCell>
            <TableCell>{invoice.quantity}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
