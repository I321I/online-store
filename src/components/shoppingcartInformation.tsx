"use client";
import { File, Truck } from "lucide-react";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { useT } from "next-i18next/client";
import { signOut, useSession } from "next-auth/react";
import {
  forwardRef,
  useActionState,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { isCartInformationValid } from "@/app/actions/isCartInformationValid";
import { ShoppingcartInformationInput } from "./shoppingcartInformationInput";

export const ShoppoingcartInformation = forwardRef<
  { click: () => void },
  { switchTab: () => void }
>((props, ref) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  useImperativeHandle(ref, () => ({
    click: () => {
      buttonRef.current?.click();
    },
  }));
  const { t } = useT("shoppingCart");
  const session = useSession();

  const initialState = {
    message: "",
    success: false,
    errors: {},
    field: {},
  };
  const [state, action] = useActionState(
    isCartInformationValid(t),
    initialState,
  );

  useEffect(() => {
    if (state.success) props.switchTab();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

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
    <form
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
      className="m-auto flex flex-col gap-4"
      action={action}
    >
      <div className="flex w-full flex-col gap-8 border border-black p-3">
        <div className="flex flex-col gap-2">
          <h2 className="flex flex-row text-xl">
            <File />
            {t("billingInformation")}
          </h2>
          <Separator />
        </div>
        <div className="relative flex flex-col">
          <Input
            id="billing"
            type="text"
            placeholder={session.data?.user?.name}
            required
            size={100}
            disabled
            className={cn(
              "peer h-10 rounded-none border-0 border-b border-dashed border-black p-0 text-xl placeholder:text-black focus-visible:ring-0 disabled:bg-transparent",
            )}
          />
          <label
            htmlFor="billing"
            className={cn(
              "transistion-all absolute cursor-text text-xl text-gray-500 duration-200 select-none peer-placeholder-shown:top-2 dark:bg-black",
              "peer-placeholder-shown:-translate-y-5 peer-placeholder-shown:text-sm",
            )}
          >
            {"*" + t("billing")}
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
              "peer h-10 rounded-none border-0 border-b border-dashed border-black p-0 text-xl placeholder:text-black focus-visible:ring-0 disabled:bg-transparent",
            )}
          />
          <label
            htmlFor="email"
            className={cn(
              "transistion-all absolute cursor-text text-xl text-gray-500 duration-200 select-none peer-placeholder-shown:top-2 dark:bg-black",
              "peer-placeholder-shown:-translate-y-5 peer-placeholder-shown:text-sm",
            )}
          >
            {"*" + t("billingEmail")}
          </label>
        </div>
        <ShoppingcartInformationInput
          state={state}
          TitleByi18n="billingNumber"
          name="billingNumber"
          type="tel"
        />
      </div>

      <div className="flex w-full flex-col gap-8 border border-black p-3">
        <div className="flex flex-col gap-2">
          <h2 className="flex flex-row text-xl">
            <Truck />
            {t("shippingInformation")}
          </h2>
          <Separator />
        </div>
        <ShoppingcartInformationInput
          state={state}
          TitleByi18n="recipient"
          name="name"
          type="text"
        />
        <ShoppingcartInformationInput
          state={state}
          TitleByi18n="recipientNumber"
          name="recipientNumber"
          type="tel"
        />
        <ShoppingcartInformationInput
          state={state}
          TitleByi18n="recipientAddress"
          name="address"
          type="text"
        />
      </div>

      <button ref={buttonRef} type="submit" />
    </form>
  );
});
ShoppoingcartInformation.displayName = "ShoppoingcartInformation";
