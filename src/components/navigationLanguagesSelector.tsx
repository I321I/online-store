"use client";
import { useT } from "next-i18next/client";
import i18nConfig from "../../i18n.config";
import { SelectItem } from "./customUi/languageSelect";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/customUi/languageSelect";
import { usePathname, useRouter } from "next/navigation";

export default function LanguagesSelect({ lng }: { lng?: string }) {
  const { t } = useT("home");
  const pathname = usePathname();
  const router = useRouter();
  const switchLocal = (locale: string) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
  };
  return (
    <Select defaultValue={lng} onValueChange={switchLocal}>
      <SelectTrigger className="flex w-auto cursor-pointer border-none text-3xl decoration-2 underline-offset-3 hover:underline focus:shadow-none active:not-aria-[haspopup]:translate-y-px max-md:hidden max-sm:hidden">
        <SelectValue placeholder={t("languages")} />
      </SelectTrigger>
      <SelectContent position={"popper"}>
        <SelectGroup>
          {i18nConfig.supportedLngs.map((item) => (
            <SelectItem key={t(`${item}`)} value={item} className="cursor-pointer">
              {t(`${item}`)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
