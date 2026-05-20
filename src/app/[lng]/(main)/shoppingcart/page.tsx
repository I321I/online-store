import { auth } from "@/auth";
import ShoppingcartTabs from "@/components/shoppingcartTabs";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (session == null) redirect("/login");
  return <ShoppingcartTabs session={session} />;
}
