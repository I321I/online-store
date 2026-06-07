import Link from "next/link";
import LanguagesSelect from "./navigationLanguagesSelector";
import { LogOut, ShoppingCart } from "lucide-react";
import { categories } from "@/app/[lng]/(main)/[categories]/page";
import DirectSelector from "./navigationDirectSelector";
import { getT } from "next-i18next/server";
import { auth, signOut } from "@/auth";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import NavigationMargin from "./navigationMargin";

export async function Navigation({ lng }: { lng: string }) {
  const { t } = await getT("home", { lng });
  const session = await auth();
  return (
    <nav>
      <div
        className={`container-1920 flex h-24 w-full flex-row flex-wrap justify-between border-b-2 border-solid px-8 py-3 pt-0 pb-7`}
      >
        <div className="flex flex-row flex-wrap items-end gap-10">
          <Link href={`/${lng}`} className="g-full font-serif text-5xl/10">
            {t("title")}
          </Link>
          <DirectSelector
            title={t("products")}
            selections={categories}
            witchSegment={2}
          />
        </div>
        <div className="flex h-full flex-row flex-wrap items-end gap-10">
          <LanguagesSelect lng={lng} />
          {!session && (
            <Link
              href={`/${lng}/login`}
              className="h-fit cursor-pointer items-end text-3xl/8 font-normal decoration-2 underline-offset-3 hover:underline max-md:hidden"
            >
              {t("login")}
            </Link>
          )}
          {session && (
            <p className="flex h-fit cursor-default text-3xl/8 font-normal">
              {session?.user?.name}
            </p>
          )}
          {session && (
            <TooltipProvider>
              <Tooltip key="tooltip">
                <TooltipTrigger asChild>
                  <form
                    className="flex items-end"
                    action={async () => {
                      "use server";
                      await signOut();
                    }}
                  >
                    <button
                      className="relative -top-0.5 h-[42%] cursor-pointer hover:shadow-[0_2px_0_0_black] active:not-aria-[haspopup]:translate-y-px"
                      type="submit"
                    >
                      <LogOut />
                    </button>
                  </form>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{t("logout")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <Link
            href={`/${lng}/shoppingcart`}
            className="relative -top-0.5 h-[42%] cursor-pointer hover:shadow-[0_2px_0_0_black] active:not-aria-[haspopup]:translate-y-px max-md:hidden"
          >
            <ShoppingCart role="button" size={28} />
          </Link>
          
        </div>
      </div>
      <NavigationMargin />
    </nav>
  );
}
