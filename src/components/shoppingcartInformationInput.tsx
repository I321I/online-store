import {
  cartInformationSchema,
  CartInformationSchema,
  FormState,
} from "@/lib/definitions";
import { Input } from "./ui/input";
import { useT } from "next-i18next/client";
import { cn } from "@/lib/utils";
import { InputHTMLAttributes, useState } from "react";

export const ShoppingcartInformationInput = ({
  state: formState,
  name,
  type,
  TitleByi18n,
}: {
  state: FormState;
  name: keyof CartInformationSchema;
  type: InputHTMLAttributes<HTMLInputElement>["type"];
  TitleByi18n: string;
}) => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  const { t } = useT("shoppingCart");
  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const name = e.target.name as keyof CartInformationSchema;
    const schema = await cartInformationSchema(t);
    const partialSchema = schema.partial();
    const result = partialSchema.safeParse({ [name]: value });
    if (!result.success) {
      setErrorMessage(result.error?.flatten().fieldErrors[name]?.[0]);
      setIsValid(false);
      return;
    }
    setErrorMessage(undefined);
    setIsValid(true);
  };
  return (
    <div className="relative flex flex-col">
      <Input
        id={TitleByi18n}
        type={type}
        name={name}
        placeholder=" "
        required
        aria-invalid={!isValid}
        size={100}
        defaultValue={formState.field?.[name]}
        onBlur={handleBlur}
        className={cn(
          "peer h-10 rounded-none border-0 border-b p-0 text-xl placeholder:text-black focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0",
        )}
      ></Input>
      <label
        htmlFor={TitleByi18n}
        className={cn(
          "transistion-all absolute cursor-text text-xl text-gray-500 duration-200 select-none peer-placeholder-shown:top-2 dark:bg-black",
          "peer-not-placeholder-shown:-translate-y-3 peer-not-placeholder-shown:text-sm",
          "peer-focus:top-0 peer-focus:-translate-y-3 peer-focus:text-sm",
          "peer-aria-invalid:text-red-500",
        )}
      >
        {"*" + t(TitleByi18n)}
      </label>
      <p className="black h-5 text-red-500">{errorMessage??formState.errors?.[name]?.[0]}</p>
    </div>
  );
};
