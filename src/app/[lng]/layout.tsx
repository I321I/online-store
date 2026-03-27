import "./globals.css";
import { dir } from "i18next";

import { languages } from "@/i18n/settings.ts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
