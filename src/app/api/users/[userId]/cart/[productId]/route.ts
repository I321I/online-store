import { auth } from "@/auth";
import { database } from "@/lib/firestore-adapter-instance";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ userId: string; productId: string }> },
) {
  const { userId } = await params;
  const { productId } = await params;
  const session = await auth();
  if (userId !== session?.user?.id)
    return new Response("user mismatch", { status: 401 });
  return await database
    .getCartItem(userId, productId)
    .then((result) => Response.json(result))
    .catch((reason) => {
      const message =
        reason instanceof Error ? reason.message : "getCartItem failed";
      return new Response(message, { status: 400 });
    });
}

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      userId: string;
      productId: string;
    }>;
  },
) {
  const { userId } = await params;
  const { productId } = await params;
  const body: { quantity: number } = await request.json();
  const session = await auth();
  if (userId !== session?.user?.id)
    return new Response("user mismatch", { status: 401 });
  return await database
    .updateCartItemQuantity(userId, productId, body.quantity)
    .then((result) => Response.json(result))
    .catch((reason) => {
      const message =
        reason instanceof Error
          ? reason.message
          : "updateCartItemQuantity failed";
      return new Response(message, { status: 400 });
    });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ userId: string; productId: string }> },
) {
  const { userId } = await params;
  const { productId } = await params;
  const session = await auth();
  if (session?.user?.id !== userId)
    return new Response("user mismatch", { status: 401 });
  return await database
    .removeCartItem(userId, productId)
    .then((result) => Response.json(result))
    .catch((reason) => {
      const message =
        reason instanceof Error ? reason.message : "removeCartItem failed";
      return new Response(message, { status: 400 });
    });
}
