import { getT } from "next-i18next/server"
import Link from "next/link"
import { Button } from "./ui/button"

export const Navigation = async ({ params }: { params: Promise<{ lng: string }> }) => {
    const { lng } = await params
    const { t } = await getT('home', { lng })
    return (
        <nav className="
        flex flex-row flex-wrap w-[100vw] h-24 border-solid border-b-2 p-3 pl-6 pb-[1%] justify-center
        max-sm:h-20" >
            <div className="flex flex-row flex-wrap  gap-10 ">
                <p className="text-[3rem] font-serif content-center
            max-sm:text-[2rem] max-md:text-[2rem]">
                    {t('title')}</p>
                <Link href="/product" className="font-sans-serif text-[2rem] content-center max-sm:hidden hover:underline underline-offset-3 decoration-2 active:not-aria-[haspopup]:translate-y-px">
                    {t("products")}
                </Link >
            </div>
            <div className="flex flex-row flex-wrap  gap-10 ">
                <Button variant="link" size="lg" className="grid decoration-2 text-[2rem] align-middle place-items-center border-t-12">
                    {t("languages")}
                </Button>
            </div>
        </nav>
    )
}