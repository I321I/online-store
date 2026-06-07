import { configureStore } from "@reduxjs/toolkit";
import { cartItemQuantity } from "./cartItemQuantity";
export const makeStore = () => {
  return configureStore({
    reducer: { [cartItemQuantity.reducerPath]: cartItemQuantity.reducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cartItemQuantity.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
