export interface IChartDB {
  getCart: (userId: string) => Promise<{ id: string; quantity: number }[] | []>;
  getCartItem: (
    userId: string,
    productId: string,
  ) => Promise<{ id: string; quantity: number }>;
  removeCartItem: (
    userId: string,
    productId: string,
  ) => Promise<{ id: string; quantity: number }>;
  updateCartItemQuantity: (
    userId: string,
    productId: string,
    quantity?: number,
    targetQuantity?: number,
  ) => Promise<{ id: string; quantity: number }>;
  checkout: (userId: string) => Promise<{ id: string; quantity: number }[]>;
}
