"use client";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Session } from "next-auth";
import { useAppSelector } from "@/lib/hook";
import { useGetQuantityQuery } from "@/lib/cartItemQuantity";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export const NavigationCart = ({
  session,
  lng,
}: {
  session: Session | null;
  lng: string;
}) => {
  const userId = session?.user?.id;
  const { data, refetch } = useGetQuantityQuery(userId ?? "", {
    skip: !userId,
  });
  const path = usePathname();

  const defferredData = useDeferredValue(data?.length);
  const displayData = data?.length ?? defferredData;
  useEffect(() => {
    refetch();
  }, [path, refetch]);

  return (
    <Link
      href={`/${lng}/shoppingcart`}
      className="relative -top-0.5 h-[42%] cursor-pointer hover:shadow-[0_2px_0_0_black] active:not-aria-[haspopup]:translate-y-px max-md:hidden"
    >
      <div
        className={`absolute start-4 -top-2 flex h-5 w-5 flex-wrap content-center justify-center rounded-2xl bg-gray-400 text-sm text-white ring-2`}
      >
        {displayData}
      </div>
      <ShoppingCart role="button" size={28} />
    </Link>
  );
};
