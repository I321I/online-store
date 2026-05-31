import { cartInformationSchema, FormState } from "@/lib/definitions";
import { TFunction } from "i18next";

export const isCartInformationValid =
  (t: TFunction) =>
  async (preState: FormState, formData: FormData): Promise<FormState> => {
    const rawData = Object.fromEntries(formData);

    const validatedFields = (await cartInformationSchema(t)).safeParse(rawData);

    if (!validatedFields.success)
      return {
        message: "資料不齊或錯誤",
        success: false,
        field: rawData as FormState["field"],
        errors: validatedFields.error.flatten().fieldErrors,
      };

    console.log("action success");
    return {
      message: "成功",
      success: true,
      field: {},
      errors: {},
    };
  };
