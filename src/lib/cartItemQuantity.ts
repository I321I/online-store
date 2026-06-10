import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartItemQuantity = createApi({
  reducerPath: "cartItemQuantity",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (build) => ({
    getQuantity: build.query<Record<string, { quantity: number }>[], string>({
      query: (userId) => `users/${userId}/cart`,
    }),
  }),
});

export const { useGetQuantityQuery } = cartItemQuantity;
