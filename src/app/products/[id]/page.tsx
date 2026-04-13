import ProductDetailClient from "@/components/ProductDetailClient";

type Params = Promise<{ id: string }>;

export default async function ProductPage({ params }: { params: Params }) {
  const { id } = await params;
  return <ProductDetailClient id={id} />;
}
