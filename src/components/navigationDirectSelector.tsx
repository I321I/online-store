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
import { usePathname, useRouter } from "next/navigation";

export default function DirectSelector({
  title,
  selections,
  witchSegment,
}: {
  title: string;
  selections: string[];
  witchSegment: number;
}) {
  const { t } = useT("home");
  const pathname = usePathname();
  const router = useRouter();
  const direct = (path: string) => () => {
    const segments = pathname.split("/");
    segments[witchSegment] = path;
    router.push(segments.join("/"));
  };
  const createGroupItem = (list: string[]) => {
    return list.map((item) => (
      <DropdownMenuItem onSelect={direct(item)} key={item}>
        {t(`${item}`)}
      </DropdownMenuItem>
    ));
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="link"
          className="focus:outliine-none font-sans-serif text-w cursor-pointer text-3xl/7 font-normal decoration-2 underline-offset-3 hover:underline active:not-aria-[haspopup]:translate-y-px max-md:hidden"
        >
          {title}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>{createGroupItem(selections)}</DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
