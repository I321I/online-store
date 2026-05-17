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
    <div className="container-1920 flex flex-col flex-wrap content-center justify-center gap-8">
      <Tabs value={activeTab} className="flex h-auto gap-7">
        <TabsList variant={null} className={cn("pointer-events-none")}>
          <TabsTrigger
            value="cart"
            className={cn(
              "flex h-auto flex-col text-lg",
              `before:flex before:h-6 before:text-sm before:w-6 before:flex-wrap before:content-center before:justify-center before:rounded-4xl before:border-0 before:bg-gray-500 before:text-white before:content-["1"] data-active:before:bg-gray-800`,
            )}
          >
            {t("cart")}
          </TabsTrigger>
          <TabsTrigger
            value="information"
            className={cn(
              "flex h-auto flex-col text-lg",
              `before:flex before:h-6 before:text-sm before:w-6 before:flex-wrap before:content-center before:justify-center before:rounded-4xl before:border-0 before:bg-gray-500 before:text-white before:content-["2"] data-active:before:bg-gray-800`,
            )}
          >
            {t("information")}
          </TabsTrigger>
          <TabsTrigger
            value="confirmation"
            className={cn(
              "flex h-auto flex-col text-lg",
              `before:flex before:h-6 before:text-sm before:w-6 before:flex-wrap before:content-center before:justify-center before:rounded-4xl before:border-0 before:bg-gray-500 before:text-white before:content-["3"] data-active:before:bg-gray-800`,
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
        className="flex h-10 cursor-pointer rounded-none bg-gray-600 text-lg font-normal"
        onClick={() => handleSwitchTab(activeTab)}
      >
        next
      </Button>
    </div>
  );
}
