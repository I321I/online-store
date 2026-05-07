"use client";
import { categories } from "@/app/[lng]/(main)/[categories]/page";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductObject } from "@/types/product";
import { useT } from "next-i18next/client";
import { usePathname, useRouter } from "next/navigation";

export function PageBreadcrumbBasic() {
  const pathname = usePathname();
  const router = useRouter();
  const segments = pathname.split("/");
  const lng = segments[1];
  const category = segments[2];
  const product = segments[3] ?? undefined;
  const { t } = useT("breadcrumb");
  const { t: tProducts } = useT("products");
  const { t: tHome } = useT("home");
  const productObject = tProducts(product, {
    returnObjects: true,
  }) as ProductObject;
  const direct = (path: string) => () => {
    const segments = pathname.split("/");
    segments[2] = path;
    router.replace([segments[0], segments[1], segments[2]].join("/"));
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/${lng}`}>{t("home")}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex cursor-pointer items-center gap-1 outline-none hover:text-black focus-visible:ring-0">
                {t("products")}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuGroup>
                {categories.map((item) => (
                  <DropdownMenuItem onSelect={direct(item)} key={item}>
                    {tHome(`${item}`)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {!product && (
          <BreadcrumbItem>
            <BreadcrumbPage>{t(`${category}`)}</BreadcrumbPage>
          </BreadcrumbItem>
        )}
        {product && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${lng}/${category}`}>{t(`${category}`)}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{productObject.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
