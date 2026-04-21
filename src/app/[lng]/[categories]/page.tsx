import { notFound } from "next/navigation";

// generateStaticParams
export const categories: string[] = ["tables", "storage"];
export default async function Page({
  params,
}: {
  params: Promise<{ categories: string }>;
}) {
  const { categories: category } = await params;
  if (!categories.find((item) => item === category)) return notFound();
  return <div>My Post: {category}</div>;
}
