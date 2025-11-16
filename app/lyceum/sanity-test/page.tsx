// app/lyceum/sanity-test/page.tsx
import { sanityClient } from "@/lib/sanity.client";

const modulesQuery = `
  *[_type == "module"] | order(order asc) {
    _id,
    title,
    description,
    "imageUrl": image.asset->url
  }
`;

export const revalidate = 60; // ISR if you want

export default async function SanityTestPage() {
  const modules = await sanityClient.fetch(modulesQuery);

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-12 py-8 text-slate-900">
      <h1 className="text-2xl font-semibold mb-4">Sanity Modules Test</h1>
      <pre className="bg-slate-900 text-slate-50 p-4 rounded-xl text-xs overflow-x-auto">
        {JSON.stringify(modules, null, 2)}
      </pre>
    </main>
  );
}
