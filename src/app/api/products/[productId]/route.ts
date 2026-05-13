import { ProductItem } from "@/interfaces/ProductsRepository";
import { database } from "@/lib/firestore-adapter-instance";
export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{ productId: string }>;
  },
) {
  const { productId } = await params;
  return await database
    .getStock(productId)
    .then((result: { id: string; stock: number }) => Response.json(result))
    .catch((reason) => {
      const message =
        reason instanceof Error ? reason.message : "getStock failed";
      return new Response(message, { status: 400 });
    });
}
export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ productId: string }>;
  },
) {
  const { productId } = await params;
  const body: { stock: ProductItem["stock"] } = await request.json();
  if (!body.stock) return new Response("body content error", { status: 400 });
  await database
    .updateStock(productId, body)
    .then((result) => result)
    .catch((reason) => {
      const message =
        reason instanceof Error ? reason.message : "updataStock failed";
      return new Response(message, { status: 400 });
    });
}
