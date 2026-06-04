"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import { useT } from "next-i18next/client";
import { useEffect, useRef, useState } from "react";
import { ShoppingcartTable } from "./shoppingcartTable";
import { ShoppoingcartInformation } from "./shoppingcartInformation";
import { Check } from "lucide-react";

const NextButton = ({
  handleSwitchTab,
  activeTab,
  total,
}: {
  handleSwitchTab: (activeTab: string) => void;
  activeTab: string;
  total: number | string;
}) => {
  const { t } = useT("shoppingCart");

  return (
    <Button
      disabled={typeof total === "string" || total > 80000 || total === 0}
      className="m-auto flex h-10 w-20 cursor-pointer rounded-none bg-gray-600 text-lg font-normal"
      onClick={() => handleSwitchTab(activeTab)}
    >
      {t("next")}
    </Button>
  );
};

export default function ShoppingcartTabs({ session }: { session: Session }) {
  const [total, setTotal] = useState<number | string>(0);
  const returnTotal = (total: number | string) => {
    setTotal(total);
    return total;
  };

  const informationButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const callCartApi = async (id: string | undefined) => {
      return await fetch(`/api/users/${id}/cart`);
    };
    callCartApi(session?.user?.id);
  }, []);

  const { t } = useT("shoppingCart");
  const [activeTab, setActiveTab] = useState("cart");
  const handleSwitchTab = async (tab: string) => {
    if (tab === "cart") setActiveTab("information");
    if (tab === "information") {
      informationButtonRef.current?.click();
    }
  };
  const handleFormValid = async () => {
    if (activeTab === "information") {
      await fetch(`/api/users/${session.user?.id}/cart`, { method: "POST" });
      setActiveTab("confirmation");
    }
  };

  return (
    <div className="container-1920 flex max-w-410 flex-col flex-wrap content-center justify-center px-10">
      <Tabs value={activeTab} className="flex w-full gap-8">
        <TabsList
          variant={null}
          className={cn(
            "pointer-events-none flex w-full flex-row justify-between px-10 group-data-[orientation=horizontal]/tabs:h-14",
          )}
        >
          <TabsTrigger
            value="cart"
            className="group flex h-auto max-w-20 flex-col items-center gap-1 text-lg font-light text-gray-400 data-active:text-gray-600"
          >
            {activeTab !== "cart" ? (
              <Check
                className={cn(
                  "size-6 stroke-[3px] text-white",
                  "flex items-center justify-center rounded-full",
                  "bg-gray-400 group-data-active:bg-gray-600",
                )}
              />
            ) : (
              <p
                className={cn(
                  "text-white",
                  "flex h-6 w-6 items-center justify-center rounded-full",
                  "bg-gray-400 group-data-active:bg-gray-600",
                )}
              >
                1
              </p>
            )}
            {t("cart")}
          </TabsTrigger>
          <div
            className={cn(
              "flex h-0 grow -translate-y-0.5 flex-wrap self-baseline border-b border-solid border-gray-300 pt-2.5",
            )}
          />
          <TabsTrigger
            value="information"
            className="group flex h-auto max-w-20 flex-col items-center gap-1 text-lg font-light text-gray-400 data-active:text-gray-600"
          >
            {activeTab !== "cart" && activeTab !== "information" ? (
              <Check
                className={cn(
                  "size-6 stroke-[3px] text-white",
                  "flex items-center justify-center rounded-full",
                  "bg-gray-400 group-data-active:bg-gray-600",
                )}
              />
            ) : (
              <p
                className={cn(
                  "text-white",
                  "flex h-6 w-6 items-center justify-center rounded-full",
                  "bg-gray-400 group-data-active:bg-gray-600",
                )}
              >
                2
              </p>
            )}
            {t("cart")}
          </TabsTrigger>
          <div
            className={cn(
              "flex h-0 grow -translate-y-0.5 flex-wrap self-baseline border-b border-solid border-gray-300 pt-2.5",
            )}
          />
          <TabsTrigger
            value="confirmation"
            className={cn(
              "flex h-auto max-w-20 flex-col text-lg font-light text-gray-400 data-active:text-gray-600",
              `before:flex before:h-6 before:w-6 before:flex-wrap before:content-center before:justify-center before:rounded-4xl before:border-0 before:bg-gray-400 before:text-sm before:text-white before:content-["3"] data-active:before:bg-gray-600`,
            )}
          >
            {t("confirmation")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="cart">
          <ShoppingcartTable session={session} emitTotal={returnTotal} />
        </TabsContent>
        <TabsContent
          value="information"
          className="m-auto flex w-full max-w-110 flex-col gap-4"
        >
          <p className="h-15 content-center bg-slate-200 text-center text-lg font-light underline">{`${t("total")}NT$ ${total.toLocaleString()}`}</p>
          <ShoppoingcartInformation
            ref={informationButtonRef}
            switchTab={handleFormValid}
          />
          <p className="h-15 content-center bg-amber-700/10 text-center text-lg font-light text-amber-700">
            {t("checkInformation")}
          </p>
        </TabsContent>
        <TabsContent value="confirmation">3</TabsContent>
      </Tabs>
      <p className="m-auto h-8 text-red-600">
        {typeof total === "number" && total > 80000 && t("exceedWarning")}
      </p>
      <div className="flex flex-row">
        <NextButton
          handleSwitchTab={handleSwitchTab}
          activeTab={activeTab}
          total={total}
        />
      </div>
    </div>
  );
}
