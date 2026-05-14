export interface ProductItem {
  title: string;
  price: string;
  description: string;
  stock: number;
}

export interface IProductsDB {
  getStock: (
    productId: string,
  ) => Promise<{ id: string; stock: ProductItem["stock"] }>;
  updateStock: (
    productId: string,
    body: { amount_change: number },
  ) => Promise<{ id: string; stock: ProductItem["stock"] }>;
}
