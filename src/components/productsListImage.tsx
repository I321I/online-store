import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

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
  return (
    <label htmlFor={`${productId}imageButton`}>
      <Image
        src={imagePath}
        width={0}
        height={0}
        sizes="100vw"
        alt={`image of product ${productId}`}
        loading="eager"
        className="aspect-square h-full w-full cursor-pointer overflow-hidden object-cover"
      />
      <button
        className="hidden"
        id={`${productId}imageButton`}
        onClick={() => {
          router.push(direct);
        }}
      />
    </label>
  );
};
