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
  console.log(direct);
  return (
    <label htmlFor={`${productId}imageButton`}>
      <Image
        src={imagePath}
        width={0}
        height={0}
        sizes="100vw"
        alt={`image of product ${productId}`}
        loading="eager"
        className="aspect-square h-auto w-auto cursor-pointer overflow-hidden object-cover"
      />
      <button
        className="hidden"
        id={`${productId}imageButton`}
        onClick={() => {
          router.replace(direct);
        }}
      />
    </label>
  );
};
