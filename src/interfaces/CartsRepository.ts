export interface IChartDB {
  getCart: (userId: string) => Promise<{ id: string; quantity: number }[] | []>;
  removeCartItem: (userId: string, productId: string) => Promise<void>;
  updateCartItemQuantity: (
    userId: string,
    productId: string,
    body: { quantity: number },
  ) => Promise<{ id: string; quantity: number }>;
}
