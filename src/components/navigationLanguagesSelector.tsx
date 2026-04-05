'use client'
import { useT } from "next-i18next/client"
import i18nConfig from "../../i18n.config"
import { SelectItem } from "./customUi/navigationLanguageSelect"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectTrigger,
    SelectValue,
} from "@/components/customUi/navigationLanguageSelect"
import { usePathname, useRouter } from "next/navigation"
import { Languages } from "lucide-react"

export default function LanguagesSelect({ lng }: { lng: string }) {
    const { t } = useT('home')
    const pathname = usePathname()
    const router = useRouter()
    const switchLocal = (locale: string) => {
        const segments = pathname.split('/')
        segments[1] = locale
        router.push(segments.join('/'))
    }
    return (
        <Select defaultValue={lng} onValueChange={switchLocal}>
            <SelectTrigger className="flex w-auto text-[2rem] border-none underline-offset-3 decoration-2 focus:shadow-none
                     max-sm:hidden hover:underline active:not-aria-[haspopup]:translate-y-px">
                <SelectValue placeholder="Languages" />
            </SelectTrigger>
            <SelectContent position={"popper"}>
                <SelectGroup>
                    {i18nConfig.supportedLngs.map(item => <SelectItem key={t(`${item}`)} value={item}>{t(`${item}`)}</SelectItem>)}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}