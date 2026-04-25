import { Categories } from "@/types/categories";
import Image from "next/image";

export const ProductsList = ({
  category,
  max,
}: {
  category: Categories;
  max: number;
}) => {
  const createListItem = (categoryPathName: string, number: number) => {
    let num: string | number = number;
    let classification = categoryPathName;
    if (num >= 100) num = 1;
    if (categoryPathName === "tables") classification = "table";
    return (
      <div
        id={classification + num}
        className="box-border flex w-24/100 flex-col border-2 border-solid p-2 max-md:w-49/100"
      >
        <Image
          src={`/images/${categoryPathName}/${num}.jpg`}
          width={0}
          height={0}
          sizes="100vw"
          alt={`image of product ${num}`}
          loading="eager"
          className="h-auto w-auto overflow-hidden object-cover aspect-square"
        />
        <p>123</p>
      </div>
    );
  };
  return (
    <div className="w-100% flex flex-row flex-wrap justify-between gap-6 max-md:gap-2 ">
      {Array.from({ length: 16 }, (_, i) => createListItem(category, i + 1))}
    </div>
  );
};
