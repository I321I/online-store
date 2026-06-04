import { auth } from "@/auth";
import { database } from "@/lib/firestore-adapter-instance";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ userId: string }> },
) {
  const { userId } = await params;
  const session = await auth();
  if (userId !== session?.user?.id)
    return new Response("user mismatch", { status: 403 });
  return await database
    .getCart(userId)
    .then((result) => Response.json(result))
    .catch((reason) => {
      const message =
        reason instanceof Error ? reason.message : "getCart failed";
      return new Response(message, { status: 400 });
    });
}

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ userId: string }> },
) {
  const { userId } = await params;
  const session = await auth();
  if (userId !== session?.user?.id)
    return new Response("user mismatch", { status: 403 });
  return await database
    .checkout(userId)
    .then((result) => Response.json(result))
    .catch((reason) => {
      const message =
        reason instanceof Error ? reason.message : "checkout failed";
      return new Response(message, { status: 400 });
    });
}
