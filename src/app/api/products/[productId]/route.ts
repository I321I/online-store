import { ProductItem } from "@/interfaces/ProductsRepository";
import { database } from "@/lib/firestore-adapter-instance";
export async function GET({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  await database
    .getStock(productId)
    .then((result) => result)
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
