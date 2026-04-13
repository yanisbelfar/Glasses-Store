import { Suspense } from "react";
import CollectionPageClient from "@/components/CollectionPageClient";

type Params = Promise<{ slug: string }>;

export default async function CollectionPage({ params }: { params: Params }) {
  const { slug } = await params;
  return (
    <Suspense>
      <CollectionPageClient slug={slug} />
    </Suspense>
  );
}
