export interface IChartsDB {
  getCart: (
    userId: string,
  ) => Promise<{ productId: string; quantity: number }[]>;
  getCartQuantity: (
    userId: string,
    productId: string,
  ) => Promise<{ productId: string; quantity: number }>;
  addProduct: (
    userId: string,
    productId: string,
    body: { quantity: number },
  ) => Promise<{ productId: string; quantity: number }>;
  removeProduct: (userId: string, productId: string) => Promise<void>;
  updateCartStock: (
    userId: string,
    productId: string,
    body: { quantity: number },
  ) => Promise<{ productId: string; quantity: number }>;
}
