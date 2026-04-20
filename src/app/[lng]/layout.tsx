import { getResources, getT, initServerI18next } from "next-i18next/server";
import "./globals.css";
import i18nConfig from "../../../i18n.config";
import { I18nProvider } from "next-i18next/client";
import { Navigation } from "@/components/navigation";
import { Suspense } from "react";
import { Footer } from "@/components/footer";

initServerI18next(i18nConfig);
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
    <html lang={lng}>
      <body className="overflow-x-hidden">
        <I18nProvider language={lng} resources={resources}>
          {/* <Navigation params={params} /> */}
          <Navigation lng={lng} />
          {children}
          <footer>
            <Footer></Footer>
          </footer>
        </I18nProvider>
      </body>
    </html>
  );
}
