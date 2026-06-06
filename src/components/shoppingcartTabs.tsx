"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import { useT } from "next-i18next/client";
import { useEffect, useRef, useState } from "react";
import { ShoppingcartTable } from "./shoppingcartTable";
import { ShoppoingcartInformation } from "./shoppingcartInformation";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      className="flex h-10 w-20 cursor-pointer rounded-none bg-gray-600 text-lg font-normal"
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { t } = useT("shoppingCart");
  const [{ activeTab, direction }, setActiveTab] = useState<{
    activeTab: "cart" | "information" | "confirmation";
    direction: -1 | 1;
  }>({ activeTab: "cart", direction: -1 });
  const handleNextSwitchTab = (tab: string) => {
    if (tab === "cart")
      setActiveTab({ activeTab: "information", direction: -1 });
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (tab === "information") {
      informationButtonRef.current?.click();
    }
  };

  const handleFormValid = async () => {
    if (activeTab === "information") {
      await fetch(`/api/users/${session.user?.id}/cart`, { method: "POST" });
      setActiveTab({ activeTab: "confirmation", direction: -1 });
    }
  };

  const variants = {
    enter: (dir: number) => {
      return { x: dir < 0 ? "120%" : "-120%", opacity: 1 };
    },
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => {
      return { x: dir < 0 ? "-120%" : "120%", opacity: 1 };
    },
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
            {t("information")}
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
        <AnimatePresence mode="popLayout" custom={direction}>
          {activeTab === "cart" && (
            <motion.div
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeOut" }}
              key="cart"
              className="w-full"
            >
              <ShoppingcartTable session={session} emitTotal={returnTotal} />
            </motion.div>
          )}
          {activeTab === "information" && (
            <motion.div
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="m-auto flex w-full flex-col gap-4"
              key="information"
            >
              <div className="m-auto flex w-full max-w-110 flex-col gap-4">
                <p className="h-15 content-center bg-slate-200 text-center text-lg font-light underline">{`${t("total")}NT$ ${total.toLocaleString()}`}</p>
                <ShoppoingcartInformation
                  ref={informationButtonRef}
                  switchTab={handleFormValid}
                />
                <p className="h-15 content-center bg-amber-700/10 text-center text-lg font-light text-amber-700">
                  {t("checkInformation")}
                </p>
              </div>
            </motion.div>
          )}
          {activeTab === "confirmation" && (
            <motion.div
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="m-auto flex w-full max-w-110 flex-col gap-7"
              key="confirmation"
            >
              <p className="h-15 content-center bg-slate-200 text-center text-lg font-light">
                {t("thanks")}
              </p>
              <p className="m-auto pt-8 text-lg font-light">{t("ship")}</p>
              <p className="m-auto text-xl text-green-800/50">
                Have a nice day!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </Tabs>
      <p className="m-auto h-8 text-red-600">
        {typeof total === "number" && total > 80000 && t("exceedWarning")}
      </p>
      {activeTab !== "confirmation" && (
        <div className="flex flex-row justify-center gap-2">
          {activeTab !== "cart" && (
            <Button
              className="flex h-10 w-20 cursor-pointer rounded-none border border-gray-600 bg-white text-lg font-normal text-black"
              onClick={() => {
                setActiveTab({ activeTab: "cart", direction: 1 });
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {t("back")}
            </Button>
          )}
          <NextButton
            handleSwitchTab={handleNextSwitchTab}
            activeTab={activeTab}
            total={total}
          />
        </div>
      )}
    </div>
  );
}
