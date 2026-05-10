import { db } from "@/firebaseConfig";
import { IChartsDB } from "@/interfaces/CartsRepository";
import { IProductsDB, ProductItem } from "@/interfaces/ProductsRepository";

export class Firestore implements IChartsDB, IProductsDB {
  //Products
  getStock = async (productId: string) => {
    try {
      const productSnap = await db.collection("products").doc(productId).get();
      const data = productSnap.data() as Pick<ProductItem, "stock"> | undefined;
      if (data == null) throw new Error("getStock Failed");
      return { id: productId, stock: data.stock };
    } catch (error) {
      throw error;
    }
  };
  updateStock: (
    productId: string,
    body: { stock: ProductItem["stock"] },
  ) => Promise<{ productId: string; stock: ProductItem["stock"] }>;
  //Carts
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
  updateCartQuantity: (
    userId: string,
    productId: string,
    body: { quantity: number },
  ) => Promise<{ productId: string; quantity: number }>;
}
