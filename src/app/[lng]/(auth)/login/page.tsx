import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { getT } from "next-i18next/server";
import { headers } from "next/headers";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";

export default async function Page({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  const { t } = await getT("common", { lng });
  const { t: tHome } = await getT("home", { lng });
  const pathname = await headers().then((item) => item.get("x-current-path"));
  const segments = pathname?.split("/");
  return (
    <div className="flex h-screen w-full flex-col flex-nowrap content-center bg-gray-100">
      <Link
        href={`/${lng}`}
        className="g-full mt-15 mb-5 flex justify-center font-serif text-5xl"
      >
        {tHome("title")}
      </Link>
      <div className="flex flex-wrap justify-center">
        <Card className="h-110 w-100 p-6 py-9">
          <CardHeader>
            <CardTitle className="text-2xl">{t("login")}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-10">
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <label htmlFor="email"></label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("emailAddress")}
                    required
                    size={100}
                    className={cn(
                      "h-15 rounded-md border-2 border-solid px-3 text-xl focus-visible:ring-0",
                    )}
                  />
                </div>
                <div className="grid gap-2"></div>
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
            <div className="flex flex-col justify-center gap-4">
              <p
                className={cn(
                  "flex text-gray-500",
                  "after:flex after:h-0 after:grow after:-translate-y-0.5 after:flex-wrap after:self-center after:border-b after:border-solid after:border-gray-300",
                  "before:flex before:h-0 before:grow before:-translate-y-0.5 before:flex-wrap before:self-center before:border-b before:border-solid before:border-gray-300",
                )}
              >
                其他方式登入
              </p>
              <div className="flex flex-row justify-center gap-2">
                <form
                  action={async () => {
                    "use server";
                    await signIn("google", { redirectTo: `/${lng}` });
                  }}
                >
                  <button
                    className="rounded-3xl border border-gray-400 p-1"
                    type="submit"
                  >
                    <FcGoogle size={30} />
                  </button>
                </form>
                <form
                  action={async () => {
                    "use server";
                    await signIn("github", { redirectTo: `/${lng}` });
                  }}
                >
                  <button
                    className="rounded-3xl border border-gray-400 p-1"
                    type="submit"
                  >
                    <SiGithub size={30} />
                  </button>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
