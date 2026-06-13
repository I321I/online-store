"use client";
import { useT } from "next-i18next/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function DirectSelector({
  title,
  selections,
  witchSegment,
}: {
  title: string;
  selections: readonly string[];
  witchSegment: number;
}) {
  const { t } = useT("home");
  const pathname = usePathname();
  const direct = (path: string) => {
    const segments = pathname.split("/");
    segments[witchSegment] = path;
    const targetPath = [segments[0], segments[1], segments[2]].join("/");
    return targetPath;
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="link"
          className="focus:outliine-none font-sans-serif cursor-pointer border-none text-3xl/7 font-normal decoration-2 underline-offset-3 hover:underline focus-visible:ring-0 active:translate-y-px max-md:hidden"
        >
          {title}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {selections.map((item) => (
            <DropdownMenuItem asChild key={item}>
              <Link className="cursor-pointer" prefetch={true} href={`${direct(item)}`}>
                {t(`${item}`)}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
