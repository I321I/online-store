export const categories = ["tables", "storage"] as const;
export type Categories = (typeof categories)[number];
