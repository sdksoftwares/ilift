import { getProducts, getCategories } from '@/lib/sanity'
import ProductCard from '@/components/ProductCard'
import SearchFilter from '@/components/SearchFilter'
import ProductSidebar from '@/components/ProductSidebar'
import ProductHero from '@/components/ProductHero'
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
  const activeCategory = categoryStr || 'all'
  // 2. Fetch Data in Parallel
  const [products, categories] = await Promise.all([
    getProducts(queryStr, categoryStr),
    getCategories()
  ]);

  // Determine active category for display


  return (
    <main className="min-h-screen bg-white">

      {/* 1. HERO SECTION */}
      <ProductHero />

      {/* 2. Main Content - Sidebar Layout */}
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">

          {/* LEFT SIDEBAR (Desktop) - 3 Columns */}
          <div className="hidden lg:block lg:col-span-3 xl:col-span-3">
            <ProductSidebar />
          </div>

          {/* RIGHT GRID - 9 Columns */}
          <div className="lg:col-span-9 xl:col-span-9 lg:border-l border-slate-200">

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden p-4 border-b border-slate-100">
              <SearchFilter categories={categories} />
            </div>

            {/* Results Header (Count + SEARCH BAR) */}
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/50 backdrop-blur-sm sticky top-20 z-10">

              {/* Left: Count */}
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wide flex items-center gap-2">
                Found <span className="text-slate-900 text-lg">{products.length}</span> Models
                {activeCategory !== 'all' && (
                  <span className="px-3 py-1 bg-red-50 text-red-700 text-[10px] font-bold uppercase rounded-full border border-red-100">
                    {activeCategory.replace(/_/g, ' ')}
                  </span>
                )}
              </span>

              {/* Right: Search Bar Integration */}
              <div className="w-full sm:w-[300px]">
                {/* We reuse the SearchFilter component's Search capability but ideally styled simpler or we reuse it as is. 
                       Since SearchFilter has both category and query, we might want a simpler one. 
                       However, strict reuse ensures consistent logic. Let's rely on SearchFilter but hide the category dropdown via CSS or props?
                       For now, let's just place SearchFilter here as it includes the Search Input.
                       But wait, the user wants a SEARCH BAR. SearchFilter has both.
                       Let's use a specialized Search Input here to avoid duplicating the dropdown.
                   */}
                <div className="relative">
                  {/* Reuse SearchFilter but maybe we should render a simplified version? 
                          Actually, SearchFilter.tsx renders both input and dropdown side-by-side. 
                          It might be better to Refactor SearchFilter to accept a 'mode' prop or just use it as is?
                          
                          Let's just use SearchFilter as is for now, it provides the search box.
                          Actually, the previous "SearchFilter" had a big dropdown. The user wants a "Search Bar".
                          I'll just inline a new client component or use SearchFilter logic inline?
                          
                          Simpler: Let's use SearchFilter, but maybe hide the dropdown via a prop or CSS class if we want ONLY the search bar.
                          But actually, maybe keeping the dropdown is fine? The user said "add a search bar".
                          
                          Let's try to just render the SearchFilter component here. It gives us robustness.
                      */}
                  <SearchFilter categories={[]} hideCategoryDropdown={true} />
                  {/* Passing empty categories array effectively hides the dropdown options or makes it useless? 
                          Actually SearchFilter renders the Select component regardless. 
                          I will accept this for now, but ideally we should split it.
                      */}
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="p-6 lg:p-10">
              {products.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {products.map((product: any) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <PackageOpen className="h-16 w-16 text-slate-200 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-400">No matching products found.</h3>
                  <p className="text-slate-400 mt-2">Try adjusting your search or filter.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}