import { getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const app = getApp();
export const db = getFirestore(app);
