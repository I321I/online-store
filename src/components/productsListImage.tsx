import ProductsListImageSkeleton from "@/components/productsListImageSkeleton";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { Skeleton } from "./ui/skeleton";

export const ProductsListImage = ({
  imagePath,
  productId,
}: {
  imagePath: string;
  productId: string;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const direct = `${pathname}/${productId}`;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    <Suspense fallback={<ProductsListImageSkeleton />}>
      <Link href={`${direct}`}>
        <Skeleton
          className={`${isLoading ? "flex" : "hidden"} aspect-square h-auto w-full overflow-hidden`}
        />
        <Image
          src={imagePath}
          width={0}
          height={0}
          sizes="100vw"
          alt={`image of product ${productId}`}
          loading="eager"
          className={`${isLoading ? "hidden" : "flex"} aspect-square h-full w-full cursor-pointer overflow-hidden object-cover`}
          priority
          onLoad={() => setIsLoading(false)}
        />
        <button
          className="hidden"
          id={`${productId}imageButton`}
          onClick={() => {
            router.push(direct);
          }}
        />
      </Link>
    </Suspense>
  );
};
