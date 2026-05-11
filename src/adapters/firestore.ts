import { db } from "@/firebaseConfig";
import { IChartDB } from "@/interfaces/CartsRepository";
import { IProductsDB, ProductItem } from "@/interfaces/ProductsRepository";

export class Firestore implements IChartDB, IProductsDB {
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
  updateStock = async (
    productId: string,
    body: { stock: ProductItem["stock"] },
  ) => {
    try {
      await db
        .collection("products")
        .doc(productId)
        .set({ stock: body.stock }, { merge: true });
      const productSnap = await db.collection("products").doc(productId).get();
      const data = productSnap.data() as Pick<ProductItem, "stock"> | undefined;
      if (data == null) throw new Error("updateStock Failed");
      return { id: productId, stock: data.stock };
    } catch (error) {
      throw error;
    }
  };

  //Cart
  getCart = async (userId: string) => {
    try {
      const cartSnap = await db
        .collection("cart")
        .doc(userId)
        .collection("items")
        .get();
      const data = cartSnap.docs.map((doc) => {
        return { id: doc.id, quantity: doc.data().quantity };
      });
      return data;
    } catch (error) {
      throw error;
    }
  };
  removeCartItem: (userId: string, productId: string) => Promise<void>;
  updateCartItemQuantity = async (
    userId: string,
    productId: string,
    body: { quantity: number },
  ) => {
    try {
      const itemSnap = await db
        .collection("cart")
        .doc(userId)
        .collection("items")
        .doc(productId)
        .get();
      const data = itemSnap.data();
      if (data == null) {
        await db
          .collection("cart")
          .doc(userId)
          .collection("items")
          .doc(productId)
          .set({ quantity: body.quantity });
        return { id: productId, quantity: body.quantity };
      }
      if (data.quantity + body.quantity > 9)
        throw new Error("quantity exceed 9");
      await db
        .collection("cart")
        .doc(userId)
        .collection("items")
        .doc(productId)
        .set({ quantity: data.quantity + body.quantity }, { merge: true });
      return { id: productId, quantity: data.quantity + body.quantity };
    } catch (error) {
      throw error;
    }
  };
}
