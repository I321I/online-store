import { createProxy } from "next-i18next/proxy";
import i18nConfig from "../i18n.config";
import { auth } from "@/auth";
import { NextRequest } from "next/server";
const i18nProxy = createProxy(i18nConfig);
export default auth((req) => {
  const request = new NextRequest(req);
  request.headers.set("x-current-path", request.nextUrl.pathname);
  return i18nProxy(request);
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)",
  ],
};
