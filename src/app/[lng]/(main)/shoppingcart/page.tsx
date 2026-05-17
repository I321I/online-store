"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useT } from "next-i18next/client";
import { useState } from "react";

export default function Page() {
  const { t } = useT("shoppingCart");
  const [activeTab, setActiveTab] = useState("cart");
  const handleSwitchTab = (tab: string) => {
    if (tab === "cart") setActiveTab("information");
    if (tab === "information") setActiveTab("confirmation");
  };
  return (
    <div className="container-1920 flex max-w-410 flex-col flex-wrap content-center justify-center gap-8">
      <Tabs value={activeTab} className="flex w-full gap-8">
        <TabsList
          variant={null}
          className={cn(
            "pointer-events-none flex w-full flex-row justify-between px-10 group-data-[orientation=horizontal]/tabs:h-14",
          )}
        >
          <TabsTrigger
            value="cart"
            className={cn(
              "flex h-auto max-w-20 flex-col text-lg text-gray-400 data-active:text-gray-600 font-light",
              `before:flex before:h-6 before:w-6 before:flex-wrap before:content-center before:justify-center before:rounded-4xl before:border-0 before:bg-gray-400 before:text-sm before:text-white before:content-["1"] data-active:before:bg-gray-600`,
            )}
          >
            {t("cart")}
          </TabsTrigger>
          <div
            className={cn(
              "flex h-0 grow -translate-y-0.5 flex-wrap self-center border-b border-solid border-gray-300",
            )}
          />
          <TabsTrigger
            value="information"
            className={cn(
              "flex h-auto max-w-20 flex-col text-lg text-gray-400 data-active:text-gray-600 font-light",
              `before:flex before:h-6 before:w-6 before:flex-wrap before:content-center before:justify-center before:rounded-4xl before:border-0 before:bg-gray-400 before:text-sm before:text-white before:content-["2"] data-active:before:bg-gray-600`,
            )}
          >
            {t("information")}
          </TabsTrigger>
          <div
            className={cn(
              "flex h-0 grow -translate-y-0.5 flex-wrap self-center border-b border-solid border-gray-300",
            )}
          />
          <TabsTrigger
            value="confirmation"
            className={cn(
              "flex h-auto max-w-20 flex-col text-lg text-gray-400 data-active:text-gray-600 font-light",
              `before:flex before:h-6 before:w-6 before:flex-wrap before:content-center before:justify-center before:rounded-4xl before:border-0 before:bg-gray-400 before:text-sm before:text-white before:content-["3"] data-active:before:bg-gray-600`,
            )}
          >
            {t("confirmation")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="cart">1</TabsContent>
        <TabsContent value="information">2</TabsContent>
        <TabsContent value="confirmation">3</TabsContent>
      </Tabs>
      <Button
        className="flex h-10 cursor-pointer rounded-none bg-gray-600 text-lg font-normal w-20 m-auto"
        onClick={() => handleSwitchTab(activeTab)}
      >
        next
      </Button>
    </div>
  );
}
