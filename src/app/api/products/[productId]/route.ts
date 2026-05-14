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
  const body: { amount_change: number } = await request.json();
  if (body.amount_change == null || body.amount_change === 0)
    return new Response("body content error", { status: 400 });
  return await database
    .updateStock(productId, body)
    .then((result) => Response.json(result))
    .catch((reason) => {
      const message =
        reason instanceof Error ? reason.message : "updataStock failed";
      return new Response(message, { status: 400 });
    });
}
