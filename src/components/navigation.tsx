"use client";
import Link from "next/link";
import { useT } from "next-i18next/client";
import LanguagesSelect from "./navigationLanguagesSelector";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { categories } from "@/app/[lng]/[categories]/page";
import DirectSelector from "./navigationDirectSelector";

export const Navigation = ({ lng }: { lng: string }) => {
  const { t } = useT("home");

  return (
    <nav className="flex h-24 w-screen flex-row flex-wrap justify-between border-b-2 border-solid py-3 pt-0 pr-12 pb-7 pl-8 max-md:h-20">
      <div className="flex flex-row flex-wrap items-end gap-10">
        <Link
          href={`/${lng}`}
          className="g-full font-serif text-5xl/9 decoration-2 underline-offset-3 max-md:text-3xl"
        >
          {t("title")}
        </Link>
        <DirectSelector
          title={t("products")}
          selections={categories}
          witchSegment={2}
        />
      </div>
      <div className="flex h-full cursor-pointer flex-row flex-wrap items-end gap-10 max-md:hidden">
        <LanguagesSelect lng={lng} />
        <Button
          variant="link"
          size="lg"
          className="h-fit cursor-pointer items-end text-3xl/7 decoration-2"
        >
          {t("login")}
        </Button>
        <ShoppingCart
          role="button"
          size={28}
          className="h-[42%] cursor-pointer hover:shadow-[0_2px_0_0_black] active:not-aria-[haspopup]:translate-y-px"
        />
      </div>
    </nav>
  );
};
