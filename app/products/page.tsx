import { getProducts, getCategories } from '@/lib/sanity'
import ProductCard from '@/components/ProductCard'
import SearchFilter from '@/components/SearchFilter'
import { PackageOpen, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

// Revalidate data every hour
// Revalidate data every hour
export const revalidate = 3600;

export const metadata = {
  title: 'Industrial Equipment Catalog | iLift',
  description: 'Browse our extensive catalog of forklifts, stackers, pallet trucks, and genuine spare parts. Certified quality for your warehouse needs.',
  keywords: ['forklift catalog', 'pallet truck price', 'industrial stacker', 'buy warehouse equipment'],
  openGraph: {
    title: 'Industrial Equipment Catalog | iLift',
    description: 'Complete inventory of certified lifting machinery and spare parts.',
    type: 'website',
  }
}

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // 1. Await URL parameters (Next.js 15)
  const params = await searchParams;
  const queryStr = typeof params.query === "string" ? params.query : undefined;
  const categoryStr = typeof params.category === "string" ? params.category : undefined;

  // 2. Fetch Data in Parallel
  const [products, categories] = await Promise.all([
    getProducts(queryStr, categoryStr),
    getCategories()
  ]);

  return (
    <main className="min-h-screen bg-slate-50">

      {/* 1. Header Section */}
      <div className="bg-slate-50 border-b border-slate-200 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.4] pointer-events-none bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-[1440px] mx-auto px-4 lg:px-6 py-16 relative z-10">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-6 font-medium">
            <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900">Catalog</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Industrial Equipment<span className="text-red-600">.</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
            Explore our complete inventory of certified lifting machinery and spare parts.
            All equipment is rigorously tested and available for immediate bulk quotation.
          </p>
        </div>
      </div>

      {/* 2. Main Content */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8">

        {/* Filter Bar */}
        <div className="mb-8">
          <SearchFilter categories={categories} />
        </div>

        {/* Results Metadata */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <span className="text-sm font-medium text-slate-600">
            Showing <strong>{products.length}</strong> {products.length === 1 ? 'result' : 'results'}
            {categoryStr && categoryStr !== 'all' && (
              <span> in <span className="text-slate-900 font-bold capitalize">"{categoryStr.replace('_', ' ')}"</span></span>
            )}
            {queryStr && (
              <span> for <span className="text-slate-900 font-bold">"{queryStr}"</span></span>
            )}
          </span>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-xl border border-slate-200 border-dashed text-center px-4">
            <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <PackageOpen className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">
              We couldn't find any equipment matching your current search filters.
              Try adjusting the keywords or category.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold border border-red-200 hover:bg-red-50 px-6 py-2.5 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Clear All Filters
            </Link>
          </div>
        )}

      </div>
    </main>
  )
}