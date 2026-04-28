"use client";
import Link from "next/link";
import { useT } from "next-i18next/client";
import LanguagesSelect from "./navigationLanguagesSelector";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { categories } from "@/app/[lng]/[categories]/page";
import DirectSelector from "./navigationDirectSelector";
import { usePathname } from "next/navigation";

export const Navigation = ({ lng }: { lng: string }) => {
  const { t } = useT("home");
  const path = usePathname();
  const segments = path.split("/");
  const isHome = !(segments[2] ?? undefined);
  return (
    <nav
      className={`${!isHome && "mb-7"} container-1920 flex h-24 w-full flex-row flex-wrap justify-between border-b-2 border-solid px-8 py-3 pt-0 pb-7`}
    >
      <div className="flex flex-row flex-wrap items-end gap-10">
        <Link
          href={`/${lng}`}
          className="g-full font-serif text-5xl/10 decoration-2 underline-offset-3 "
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
          className="h-fit cursor-pointer items-end text-3xl/7 decoration-2 font-normal"
        >
          {t("login")}
        </Button>
        <ShoppingCart
          role="button"
          size={28}
          className="h-[42%] cursor-pointer hover:shadow-[0_2px_0_0_black] active:not-aria-[haspopup]:translate-y-px -translate-y-0.5"
        />
      </div>
    </nav>
  );
};
