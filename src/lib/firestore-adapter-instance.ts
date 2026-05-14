import { FirestoreAdapter } from "@/adapters/firestore";
import { db } from "@/firebaseConfig";

const globalForFirestore = global as unknown as {
  database: FirestoreAdapter | undefined;
};

export const database = globalForFirestore.database ?? new FirestoreAdapter(db);

if (process.env.NODE_ENV !== "production")
  globalForFirestore.database = database;
