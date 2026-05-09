import { getResources, getT, initServerI18next } from "next-i18next/server";
import "../../globals.css";
import { I18nProvider } from "next-i18next/client";
import { SessionProvider } from "next-auth/react";
import i18nConfig from "../../../../../i18n.config";

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
      <body className=" overflow-x-hidden">
        <I18nProvider language={lng} resources={resources}>
          <SessionProvider>{children}</SessionProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
