"use client";
import Link from "next/link";
import { useT } from "next-i18next/client";
import LanguagesSelect from "./navigationLanguagesSelector";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

export const Navigation = ({ lng }: { lng: string }) => {
  const { t } = useT("home");

  return (
    <nav className="flex h-24 w-screen flex-row flex-wrap justify-between border-b-2 border-solid p-3 pr-10 pl-8 max-sm:h-20">
      <div className="flex flex-row flex-wrap gap-10">
        <p className="content-center font-serif text-5xl max-md:text-3xl max-sm:text-3xl">
          {t("title")}
        </p>
        <Link
          href="/product"
          className="font-sans-serif content-center text-3xl decoration-2 underline-offset-3 hover:underline active:not-aria-[haspopup]:translate-y-px max-sm:hidden"
        >
          {t("products")}
        </Link>
      </div>
      <div className="flex h-full flex-row flex-wrap items-center gap-10 max-md:hidden max-sm:hidden">
        <LanguagesSelect lng={lng} />
        <Button
          variant="link"
          size="lg"
          className="h-full text-3xl decoration-2"
        >
          {t("login")}
        </Button>
        <ShoppingCart
          role="button"
          size={28}
          className="h-[42%] hover:shadow-[0_2.5px_0_0_black] active:not-aria-[haspopup]:translate-y-px"
        />
      </div>
    </nav>
  );
};
