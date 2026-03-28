import "./globals.css";
import { dir } from "i18next";
import { languages } from "@/i18n/settings";

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
