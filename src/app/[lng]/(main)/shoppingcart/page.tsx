"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useT } from "next-i18next/client";
import { useState } from "react";

export default function Page() {
  const { t } = useT("shoppingCart");
  const [activeTab, setActiveTab] = useState("cart");
  const handleSetActiveTab = (tab: string) => {
    if (tab === "cart") setActiveTab("information");
    if (tab === "information") setActiveTab("confirmation");
  };
  return (
    <div className="container-1920 flex flex-col flex-wrap content-center justify-center">
      <Tabs value={activeTab}>
        <TabsList variant={null} className="pointer-events-none">
          <TabsTrigger value="cart" className="data-active:text-gray-500">
            {t("cart")}
          </TabsTrigger>
          <TabsTrigger
            value="information"
            className="data-active:text-gray-500"
          >
            {t("information")}
          </TabsTrigger>
          <TabsTrigger
            value="confirmation"
            className="data-active:text-gray-500"
          >
            {t("confirmation")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="cart">1</TabsContent>
        <TabsContent value="information">2</TabsContent>
        <TabsContent value="confirmation">3</TabsContent>
      </Tabs>
      <Button
        className="flex h-10 rounded-none bg-gray-600 text-lg font-normal"
        onClick={() => handleSetActiveTab(activeTab)}
      >
        next
      </Button>
    </div>
  );
}
