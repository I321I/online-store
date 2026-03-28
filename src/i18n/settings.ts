export const fallbackLng = "zh-Hant";
export const languages = [fallbackLng, "en"];
export const cookieName = 'i18next'
export const defaultNS = "translateion"

export function getOptions(lng = fallbackLng, ns = defaultNS) {
    return {
        //debug:true
        supportedLngs: languages,
        fallbackLng,
        lng,
        fallbackNS: defaultNS,
        defaultNS,
        ns,
    }
}