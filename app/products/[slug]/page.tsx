import { client, getProduct } from '@/lib/sanity'
import AddToCartButton from '@/components/AddToCartButton'
import ProductImageGallery from '@/components/ProductImageGallery'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  CheckCircle2, Truck, ShieldCheck,
  FileText, ArrowRight, Phone, Info
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PortableText } from 'next-sanity'

export const revalidate = 60

const SIMILAR_PRODUCTS_QUERY = `
  *[_type == "product" && category == $category && _id != $currentId] | order(_createdAt desc)[0...4] {
    _id,
    "name": coalesce(name.en, name),
    "slug": slug.current,
    "imageUrl": images[0].asset->url,
    category,
    price
  }
`

import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: PageProps,
): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    return {
      title: 'Product Not Found | iLift',
    }
  }

  const productName = product.name?.en || product.name || "Industrial Product"
  const catName = product.category?.replace('_', ' ') || "Industrial Equipment"

  return {
    title: `${productName} | iLift India`,
    description: `Get the best price for ${productName}. Premium ${catName} available for immediate delivery. Request a quote today.`,
    openGraph: {
      title: `${productName} - Specifications & Price`,
      description: `Check specifications and pricing for ${productName}.`,
      images: product.images?.[0]?.asset?.url ? [product.images[0].asset.url] : [],
    }
  }
}

export default async function ProductPage(props: PageProps) {
  const params = await props.params;
  const product = await getProduct(params.slug)

  if (!product) {
    notFound()
  }

  const similarProducts = await client.fetch(
    SIMILAR_PRODUCTS_QUERY,
    { category: product.category, currentId: product._id },
    { next: { revalidate: 0 } }
  )

  const productName = product.name?.en || product.name || "Unknown Product"
  const images = product.images || []

  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-20">

      {/* 1. COMPACT BREADCRUMB */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-red-600 transition-colors">Home</Link> /
            <Link href="/products" className="hover:text-red-600 transition-colors">Catalog</Link> /
            <span className="text-slate-900 font-medium truncate max-w-[300px]">{productName}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-8">

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">

          {/* --- LEFT COLUMN: VISUALS + PRIMARY ACTIONS (Cols 1-5) --- */}
          <div className="lg:col-span-5 space-y-6">
            <ProductImageGallery images={images} name={productName} />

            {/* MOVED: Primary CTAs are now here for better visibility */}
            {/* UPDATED: Buttons are now in columns (grid) instead of a list */}
            <div className="w-full">
              <AddToCartButton product={product} />
            </div>
          </div>

          {/* --- RIGHT COLUMN: INFO & TABS (Cols 6-12) --- */}
          <div className="lg:col-span-7 flex flex-col h-full">

            {/* Header */}
            <div className="mb-8">
              <Badge variant="secondary" className="mb-3 bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 rounded-sm text-[10px] uppercase tracking-widest px-2 py-1">
                {product.category?.replace('_', ' ') || 'Industrial Equipment'}
              </Badge>

              <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-2 leading-tight tracking-tight">
                {productName}
              </h1>

              <p className="text-slate-500 text-base font-medium mb-6">
                High-performance {product.category?.replace('_', ' ') || 'machinery'} engineered for industrial reliability.
              </p>

              {/* Price Block (Clean & Professional) */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 inline-block w-full sm:w-auto min-w-[250px]">
                {product.price ? (
                  <div>
                    <p className="text-xs text-slate-500 font-medium mb-1">Estimated Price</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-slate-900">₹{product.price.toLocaleString('en-IN')}</span>
                      <span className="text-xs text-slate-500 font-medium bg-white px-1.5 py-0.5 rounded border border-slate-200">excl. GST</span>
                    </div>
                  </div>
                ) : (
                  <Link href="/contact" className="block">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <span className="text-lg font-bold text-blue-700">Price on Request</span>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </div>

            {/* TABBED CONTENT */}
            <div className="flex-1 bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
              <Tabs defaultValue="description" className="w-full">
                <div className="bg-slate-50/80 border-b border-slate-200">
                  <TabsList className="flex w-full justify-start bg-transparent p-0 h-12 overflow-x-auto scrollbar-hide">
                    <TabsTrigger
                      value="description"
                      className="h-full flex-shrink-0 rounded-none border-b-2 border-transparent px-6 data-[state=active]:bg-white data-[state=active]:border-b-red-600 data-[state=active]:text-red-700 data-[state=active]:shadow-none text-slate-600 font-semibold text-sm transition-all hover:text-slate-900"
                    >
                      Description
                    </TabsTrigger>
                    <TabsTrigger
                      value="specs"
                      className="h-full flex-shrink-0 rounded-none border-b-2 border-transparent px-6 data-[state=active]:bg-white data-[state=active]:border-b-red-600 data-[state=active]:text-red-700 data-[state=active]:shadow-none text-slate-600 font-semibold text-sm transition-all hover:text-slate-900"
                    >
                      Specifications
                    </TabsTrigger>
                    <TabsTrigger
                      value="shipping"
                      className="h-full flex-shrink-0 rounded-none border-b-2 border-transparent px-6 data-[state=active]:bg-white data-[state=active]:border-b-red-600 data-[state=active]:text-red-700 data-[state=active]:shadow-none text-slate-600 font-semibold text-sm transition-all hover:text-slate-900"
                    >
                      Shipping
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-6 lg:p-8 min-h-[300px]">

                  {/* Description Tab */}
                  <TabsContent value="description" className="mt-0 space-y-4 animate-in fade-in-50 duration-300">
                    <div className="prose prose-slate prose-sm max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600">
                      {product.description ? (
                        <PortableText value={product.description} />
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-slate-400 bg-slate-50 rounded-lg border border-slate-100 border-dashed">
                          <FileText className="h-10 w-10 mb-3 opacity-20" />
                          <p className="font-medium">No detailed description available.</p>
                          <p className="text-xs mt-1">Please contact sales for more information about this product.</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  {/* Specs Tab */}
                  <TabsContent value="specs" className="mt-0 animate-in fade-in-50 duration-300">
                    <div className="border border-slate-200 rounded-lg overflow-hidden text-sm">
                      {product.specifications ? (
                        Object.entries(product.specifications).map(([key, value], idx) => (
                          <div key={key} className={`flex p-4 ${idx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'} border-b border-slate-100 last:border-0`}>
                            <span className="w-1/3 font-medium text-slate-500 capitalize">{key.replace(/_/g, ' ')}</span>
                            <span className="w-2/3 text-slate-900 font-semibold">{String(value)}</span>
                          </div>
                        ))
                      ) : (
                        <div className="p-12 text-slate-500 text-center bg-slate-50 rounded-lg border border-slate-200 border-dashed">
                          <p>Technical specifications sheet available upon request.</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  {/* Shipping Tab */}
                  <TabsContent value="shipping" className="mt-0 animate-in fade-in-50 duration-300">
                    <div className="space-y-6 text-sm text-slate-600">
                      <div className="flex gap-4 items-start p-4 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="bg-white p-2 rounded-full shadow-sm">
                          <Truck className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-base mb-1">Standard Delivery</p>
                          <p className="leading-relaxed">We utilize specialized heavy logistics partners for safe transport. Estimated delivery timeline is <strong>5-10 business days</strong> post-dispatch, depending on your location.</p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start p-4 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="bg-white p-2 rounded-full shadow-sm">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-base mb-1">Stock Availability</p>
                          <p className="leading-relaxed">Inventory levels fluctuate daily. Adding this item to your enquiry allows our team to confirm real-time stock status and reserve units for you.</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>

          </div>
        </div>

        {/* SIMILAR PRODUCTS */}
        {similarProducts.length > 0 && (
          <div className="mt-20 pt-10 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-slate-900">Similar Machinery</h2>
              {/* RESTORED: View Catalog Button */}
              <Link href="/products" className="hidden sm:flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 hover:underline transition-all">
                View Full Catalog <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {similarProducts.map((sim: any) => (
                <Link key={sim._id} href={`/products/${sim.slug}`} className="group bg-white border border-slate-200 rounded-lg hover:border-red-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="aspect-[4/3] relative p-6 bg-white flex items-center justify-center border-b border-slate-100 group-hover:bg-slate-50/50 transition-colors">
                    {sim.imageUrl ? (
                      <Image
                        src={sim.imageUrl}
                        alt={sim.name}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : <div className="w-full h-full bg-slate-50 flex items-center justify-center text-xs text-slate-400">No Image</div>}
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-slate-900 text-sm truncate group-hover:text-red-600 transition-colors">{sim.name}</h4>
                    <p className="text-xs text-slate-500 mt-1 capitalize font-medium">{sim.category?.replace('_', ' ')}</p>
                    <div className="mt-3 text-sm font-semibold text-slate-700">
                      {sim.price ? `₹${sim.price.toLocaleString('en-IN')}` : <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded">View Price</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile View All Button */}
            <div className="mt-8 sm:hidden">
              <Link
                href="/products"
                className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50"
              >
                View Full Catalog <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}