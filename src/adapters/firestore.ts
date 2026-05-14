import { IChartDB } from "@/interfaces/CartsRepository";
import { IProductsDB, ProductItem } from "@/interfaces/ProductsRepository";

export class FirestoreAdapter implements IChartDB, IProductsDB {
  //Products
  #db;
  constructor(firestore: FirebaseFirestore.Firestore) {
    this.#db = firestore;
  }
  getStock = async (productId: string) => {
    try {
      const productSnap = await this.#db
        .collection("products")
        .doc(productId)
        .get();
      const data = productSnap.data() as Pick<ProductItem, "stock"> | undefined;
      if (data == null) throw new Error("getStock Failed");
      return { id: productId, stock: data.stock };
    } catch (error) {
      throw error;
    }
  };
  updateStock = async (productId: string, body: { amount_change: number }) => {
    try {
      const productSnap = await this.#db
        .collection("products")
        .doc(productId)
        .get();
      const data = productSnap.data() as Pick<ProductItem, "stock"> | undefined;
      if (data == null) throw new Error("updateStock Failed");
      if (
        data.stock + body.amount_change > 999 ||
        data.stock + body.amount_change < 0
      )
        throw new Error("updateStock refused");
      await this.#db
        .collection("products")
        .doc(productId)
        .set({ stock: data.stock + body.amount_change }, { merge: true });
      return { id: productId, stock: data.stock + body.amount_change };
    } catch (error) {
      throw error;
    }
  };

  //Cart
  getCart = async (userId: string) => {
    try {
      const cartSnap = await this.#db
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
  removeCartItem = async (userId: string, productId: string) => {
    try {
      const itemRef = this.#db
        .collection("cart")
        .doc(userId)
        .collection("items")
        .doc(productId);
      const itemSnap = await itemRef.get();
      const data = itemSnap.data();
      if (data == null) throw new Error(`${productId} isnt't exist in cart`);
      await itemRef.delete();
      return { id: productId, quantity: data.quantity };
    } catch (error) {
      throw error;
    }
  };
  updateCartItemQuantity = async (
    userId: string,
    productId: string,
    body: { quantity: number },
  ) => {
    try {
      const itemSnap = await this.#db
        .collection("cart")
        .doc(userId)
        .collection("items")
        .doc(productId)
        .get();
      const data = itemSnap.data();
      if (data == null) {
        await this.#db
          .collection("cart")
          .doc(userId)
          .collection("items")
          .doc(productId)
          .set({ quantity: body.quantity });
        return { id: productId, quantity: body.quantity };
      }
      if (data.quantity + body.quantity > 9)
        throw new Error("quantity exceed 9");
      await this.#db
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
