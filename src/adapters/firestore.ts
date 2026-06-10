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
  updateStock = async (productId: string, amount_change: number) => {
    try {
      const productSnap = await this.#db
        .collection("products")
        .doc(productId)
        .get();
      const data = productSnap.data() as Pick<ProductItem, "stock"> | undefined;
      if (data == null) throw new Error("updateStock Failed");
      if (amount_change < -9 || amount_change > 9)
        throw new Error("updateStock refused");
      if (data.stock + amount_change > 999 || data.stock + amount_change < 0)
        throw new Error("updateStock refused");
      await this.#db
        .collection("products")
        .doc(productId)
        .set({ stock: data.stock + amount_change }, { merge: true });
      return { id: productId, stock: data.stock + amount_change };
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
  getCartItem = async (userId: string, productId: string) => {
    try {
      const productSnap = await this.#db
        .collection("products")
        .doc(productId)
        .get();
      if (productSnap.data() == null)
        throw new Error(`${productId} isnt't exist`);

      const itemSnap = await this.#db
        .collection("cart")
        .doc(userId)
        .collection("items")
        .doc(productId)
        .get();
      const data = itemSnap.data() as { quantity: number };
      if (data == null) return { id: productId, quantity: 0 };
      return { id: productId, quantity: data.quantity };
    } catch (error) {
      throw error;
    }
  };
  removeCartItem = async (userId: string, productId: string) => {
    try {
      const productSnap = await this.#db
        .collection("products")
        .doc(productId)
        .get();
      if (productSnap.data() == null)
        throw new Error(`${productId} isnt't exist`);

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
    quantity?: number,
    targetQuantity?: number,
  ) => {
    try {
      const productSnap = await this.#db
        .collection("products")
        .doc(productId)
        .get();
      if (productSnap.data() == null)
        throw new Error(`${productId} isnt't exist`);
    } catch (error) {
      throw error;
    }

    if (quantity && targetQuantity == null)
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
            .set({ quantity: quantity });
          return { id: productId, quantity: quantity };
        }
        if (data.quantity + quantity > 9) throw new Error("quantity exceed 9");
        await this.#db
          .collection("cart")
          .doc(userId)
          .collection("items")
          .doc(productId)
          .set({ quantity: data.quantity + quantity }, { merge: true });
        return { id: productId, quantity: data.quantity + quantity };
      } catch (error) {
        throw error;
      }

    if (targetQuantity == null)
      throw new Error("quantity == null && targetQuantity == null");
    try {
      if (targetQuantity < 1 || targetQuantity > 9)
        throw new Error("quantity exceed 9");
      await this.#db
        .collection("cart")
        .doc(userId)
        .collection("items")
        .doc(productId)
        .set({ quantity: targetQuantity }, { merge: true });
      return { id: productId, quantity: targetQuantity };
    } catch (error) {
      throw error;
    }
  };
  checkout = async (userId: string) => {
    try {
      return await this.#db.runTransaction(async () => {
        const cartSnap = await this.#db
          .collection("cart")
          .doc(userId)
          .collection("items")
          .get();
        const data = await Promise.all(
          cartSnap.docs.map(async (doc) => {
            try {
              await this.updateStock(doc.id, -doc.data().quantity);
              return { id: doc.id, quantity: doc.data().quantity };
            } catch (error) {
              throw error;
            }
          }),
        );
        const cartRef = this.#db
          .collection("cart")
          .doc(userId)
          .collection("items");
        await this.#db.recursiveDelete(cartRef);
        return data;
      });
    } catch (error) {
      throw error;
    }
  };
}
