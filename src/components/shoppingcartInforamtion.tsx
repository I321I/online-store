import { File } from "lucide-react";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { useT } from "next-i18next/client";
import { signOut, useSession } from "next-auth/react";

export const ShoppoingcartInformation = () => {
  const { t } = useT("shoppingCart");
  const session = useSession();
  if (session.data?.user?.name == null || session.data.user.email == null) {
    (() => {
      const answer = confirm("用戶資料錯誤，請登出重試");
      if (answer) {
        signOut();
        return;
      } else {
        signOut();
      }
    })();
    return;
  }
  return (
    <div className="m-auto flex flex-col gap-4">
      <div className="flex w-full flex-col gap-6 border border-black p-3">
        <div className="flex flex-col gap-2">
          <h2 className="flex flex-row text-xl">
            <File />
            訂購資料
          </h2>
          <Separator />
        </div>
        <div className="relative flex flex-col">
          <Input
            id="orderer"
            type="text"
            placeholder={session.data?.user?.name}
            required
            size={100}
            disabled
            className={cn(
              "peer h-10 rounded-none border-0 border-b p-0 text-xl placeholder:text-black focus-visible:ring-0 disabled:bg-transparent",
            )}
          />
          <label
            htmlFor="orderer"
            className={cn(
              "transistion-all absolute cursor-text text-xl text-gray-500 duration-200 select-none peer-placeholder-shown:top-2 dark:bg-black",
              "peer-placeholder-shown:-translate-y-5 peer-placeholder-shown:text-sm",
            )}
          >
            {"*" + t("orderer")}
          </label>
        </div>
        <div className="relative flex flex-col">
          <Input
            id="email"
            type="email"
            name="email"
            placeholder={session.data.user.email}
            disabled
            required
            size={100}
            className={cn(
              "peer h-10 rounded-none border-0 border-b p-0 text-xl placeholder:text-black focus-visible:ring-0 disabled:bg-transparent",
            )}
          />
          <label
            htmlFor="email"
            className={cn(
              "transistion-all absolute cursor-text text-xl text-gray-500 duration-200 select-none peer-placeholder-shown:top-2 dark:bg-black",
              "peer-placeholder-shown:-translate-y-5 peer-placeholder-shown:text-sm",
            )}
          >
            {"*" + t("ordererEmail")}
          </label>
        </div>
        <div className="relative flex flex-col">
          <Input
            id="ordererNumber"
            type="tel"
            placeholder=" "
            required
            size={100}
            className={cn(
              "peer h-10 rounded-none border-0 border-b p-0 text-xl placeholder:text-black focus-visible:ring-0 disabled:bg-transparent",
            )}
          />
          <label
            htmlFor="ordererNumber"
            className={cn(
              "transistion-all absolute cursor-text text-xl text-gray-500 duration-200 select-none peer-placeholder-shown:top-2 dark:bg-black",
              "peer-not-placeholder-shown:-translate-y-3 peer-not-placeholder-shown:text-sm",
              "peer-focus:top-0 peer-focus:-translate-y-3 peer-focus:text-sm",
            )}
          >
            {"*" + t("ordererNumber")}
          </label>
        </div>
      </div>
    </div>
  );
};
