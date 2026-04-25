import { I18nConfig } from "next-i18next";

const i18nConfig: I18nConfig = {
  supportedLngs: ["zh-Hant", "en"],
  fallbackLng: "zh-Hant",
  defaultNS: "common",
  ns: ["common", "home","breadcrumb","products"],
  resourceLoader: (language, namespace) =>
    import(`./src/i18n/locales/${language}/${namespace}.json`),
};

export default i18nConfig;
