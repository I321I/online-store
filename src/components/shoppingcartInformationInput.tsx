import { Input } from "./ui/input";

export const ShoppingcartInformationInput = () => {
  return (
    <>
      <Input
        id="ordererNumber"
        type="tel"
        name="number"
        placeholder=" "
        required
        aria-invalid
        size={100}
        defaultValue={state.field?.number}
        onBlur={handleBlur}
        className={cn(
          "peer h-10 rounded-none border-0 border-b p-0 text-xl placeholder:text-black focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0",
        )}
      />
      <label
        htmlFor="ordererNumber"
        className={cn(
          "transistion-all absolute cursor-text text-xl text-gray-500 duration-200 select-none peer-placeholder-shown:top-2 dark:bg-black",
          "peer-not-placeholder-shown:-translate-y-3 peer-not-placeholder-shown:text-sm",
          "peer-focus:top-0 peer-focus:-translate-y-3 peer-focus:text-sm",
          "peer-aria-invalid:text-red-500",
        )}
      >
        {"*" + t("ordererNumber")}
      </label>
      <p className="black h-5 text-red-500">{state.errors?.number}</p>
    </>
  );
};
