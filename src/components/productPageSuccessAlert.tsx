"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { useT } from "next-i18next/client";

export function ProductPageSuccessAlert({
  success,
  setSuccess,
}: {
  success: boolean;
  setSuccess: (boolean: boolean) => void;
}) {
  const { t } = useT("common");
  return (
    <AlertDialog open={success}>
      <AlertDialogContent>
        <AlertDialogHeader className="flex justify-center">
          <AlertDialogTitle className="text-2xl font-normal">
            {t("success")}
          </AlertDialogTitle>
          <AlertDialogDescription className="hidden"></AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center sm:justify-center">
          <Button
            className="flex h-10 cursor-pointer rounded-none bg-gray-600 text-lg font-normal"
            onClick={() => setSuccess(false)}
          >
            {t("confirm")}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
