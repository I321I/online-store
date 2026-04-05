"use client"
import Link from "next/link"

// import { getT } from "next-i18next/server"
import { useT } from "next-i18next/client"
import LanguagesSelect from "./navigationLanguagesSelector"
import { Button } from "./ui/button"
import { Languages, ShoppingCart } from "lucide-react"

export interface LucideProps {
    size?: number | string;
    color?: string;
    strokeWidth?: number;
    absoluteStrokeWidth?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any; // Any other SVG attributes
}

// export const Navigation = ({ params }: { params: Promise<{ lng: string }> }) => {
export const Navigation = ({ lng }: { lng: string }) => {
    // const { lng } = params
    // const { t } = await getT('home', { lng })
    const { t } = useT('home')

    return (
        <nav className="
        flex flex-row flex-wrap w-[100vw] h-24 border-solid border-b-2 p-3 pl-8  pr-10  justify-between
        max-sm:h-20" >
            <div className="flex flex-row flex-wrap  gap-10 ">
                <p className="text-[3rem] font-serif content-center
            max-sm:text-[2rem] max-md:text-[2rem]">
                    {t('title')}</p>
                <Link href="/product"
                    className="font-sans-serif text-[2rem] content-center underline-offset-3 decoration-2 
                max-sm:hidden hover:underline active:not-aria-[haspopup]:translate-y-px">
                    {t("products")}
                </Link >
            </div>
            <div className="flex flex-row flex-wrap h-full gap-10 items-center
            max-sm:hidden max-md:hidden">
                <LanguagesSelect lng={lng} />
                <Button variant="link" size="lg" className="grid h-full decoration-2 text-[2rem] items-center">
                    {t("login")}
                </Button>
                <ShoppingCart role="button" size={28} className="h-[42%] hover:shadow-[0_2.5px_0_0_black] active:not-aria-[haspopup]:translate-y-px"/>
            </div>
        </nav>
    )
}