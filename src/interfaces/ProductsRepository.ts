export interface ProductItem {
  title: string;
  price: string;
  description: string;
  stock: number;
}

export interface IProductsDB {
  getStock: (
    productId: string,
  ) => Promise<{ productId: string; stock: ProductItem["stock"] }>;
  updateStock: (
    productId: string,
    body: { stock: ProductItem["stock"] },
  ) => Promise<{ productId: string; stock: ProductItem["stock"] }>;
}
