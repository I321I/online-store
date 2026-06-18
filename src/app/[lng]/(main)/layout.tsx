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
import NextTopLoader from 'nextjs-toploader';
import { Analytics } from '@vercel/analytics/next';

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
                <NextTopLoader
                color="#888888"/>
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
