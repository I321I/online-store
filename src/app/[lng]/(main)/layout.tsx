import { getResources, getT, initServerI18next } from "next-i18next/server";
import "../globals.css";
import i18nConfig from "../../../../i18n.config";
import { I18nProvider } from "next-i18next/client";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SessionProvider } from "next-auth/react";
import StoreProvider from "./storeProvider";
import { Inter, Noto_Sans_TC } from "next/font/google";
import { SidebarProvider } from "@/components/ui/sidebar";
import { MySideBar } from "@/components/mySidebar";
import NextTopLoader from "nextjs-toploader";
import { Analytics } from "@vercel/analytics/next";
import { Metadata } from "next";

initServerI18next(i18nConfig);

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoFont = Noto_Sans_TC({
  subsets: ["latin"],
  variable: "--font-noto",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: { default: "Donuts", template: "%s - Donuts" },
  description:
    "此專案是自主開發，目的在於深化自身實作網頁前端設計能力。此電商網站具響應式網頁設計(RWD)，陳列的產品均為模擬資料，未實際提供物流及金流服務，因此可隨意瀏覽操作及點擊。專案採 Next.js 全端框架 與 Firebase 無伺服器資料庫 (Serverless DB) 開發，嚴格遵守前後端分離，將前後端以 RESTful API 串接，並且以 Adapter Pattern 設計後端與資料庫溝通，以取得更好的維護性。Donuts成立於2026年，提供諸多家飾以供選擇。網站內的產品均為模擬資料，可隨意瀏覽操作點擊。登入/註冊方面，採取Magic Link和OAuth，使用時除了Email及ID外，未經使用者授權的第三方帳戶資料不會被開發者存取，請放心使用登入/註冊的功能。",
  metadataBase: new URL("https://i321ionline.store"),
  alternates: {
    canonical: "/zh-Hant",
    languages: {
      "x-default": "/zh-Hant",
      "zh-Hant": "/zh-Hant",
      en: "/en",
    },
  },
  verification: {
    google: "86c95c42f2dcfe58",
  },
  openGraph: {
    title: "Donuts",
    images: [
      {
        url: "/images/home.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}>) {
  const { lng } = await params;
  const { i18n } = await getT();
  const resources = getResources(i18n);

  return (
    <html lang={lng} className={`${inter.variable} ${notoFont.variable}`}>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className="overflow-x-hidden overflow-y-scroll">
        <I18nProvider language={lng} resources={resources}>
          <SessionProvider>
            <StoreProvider>
              <SidebarProvider className="flex flex-col" defaultOpen={false}>
                <NextTopLoader color="#888888" />
                <Navigation lng={lng} />
                {children}
                <footer>
                  <Footer />
                </footer>
                <MySideBar lng={lng} />
              </SidebarProvider>
            </StoreProvider>
          </SessionProvider>
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}
