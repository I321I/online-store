import { TFunction } from "i18next";
import { z } from "zod";

export const cartInformationSchema = async (t: TFunction) => {
  return z.object({
    name: z.string().min(1, { message: t("requiredFieldInvalid") }),
    recipientNumber: z
      .string()
      .trim()
      .regex(/^09/, { message: t("numberInvalid") })
      .length(10, { message: t("numberInvalid") }),
    billingNumber: z
      .string()
      .trim()
      .regex(/^09/, { message: t("numberInvalid") })
      .length(10, { message: t("numberInvalid") }),
    address: z.string().min(1, { message: t("requiredFieldInvalid") }),
  });
};

export type CartInformationSchema = z.infer<
  Awaited<ReturnType<typeof cartInformationSchema>>
>;

export type FormState = {
  message?: string;
  success: boolean;
  field?: { name?: string; number?: string; address?: string };
  errors?: { name?: string[]; number?: string[]; address?: string[] };
};
