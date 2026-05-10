import { db } from "@/firebaseConfig";
import products from "@/i18n/locales/en/products.json";
import { NextResponse } from "next/server";
const dataIds = Object.keys(products);
export default function GET() {}
export  function PATCH() {}
export async function POST() {
  try {
    const collection = db.collection("products");
    for (let i = 0; i < dataIds.length; i++) {
      await collection.doc(dataIds[i]).set({
        stock: 999,
      });
    }
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "failed to set data" }, { status: 500 });
  }
}
