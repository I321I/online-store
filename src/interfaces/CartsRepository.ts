export interface IChartsDB {
  getCart: (
    userId: string,
  ) => Promise<{ id: string; quantity: number }[]>;
  getCartQuantity: (
    userId: string,
    productId: string,
  ) => Promise<{ id: string; quantity: number }>;
  addProduct: (
    userId: string,
    productId: string,
    body: { quantity: number },
  ) => Promise<{ id: string; quantity: number }>;
  removeProduct: (userId: string, productId: string) => Promise<void>;
  updateCartQuantity: (
    userId: string,
    productId: string,
    body: { quantity: number },
  ) => Promise<{ id: string; quantity: number }>;
}
