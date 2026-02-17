import { client, getProduct } from '@/lib/sanity'
import ProductDetailHero from '@/components/ProductDetailHero'
import ProductFeatures from '@/components/ProductFeatures'
import RecommendedProducts from '@/components/RecommendedProducts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  CheckCircle2, Truck, ArrowRight
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PortableText } from 'next-sanity'
import { PortableTextBlock } from 'sanity'
import DownloadSpecButton from '@/components/DownloadSpecButton'
import { formatRange } from '@/lib/utils'

// Category Specific Components
import ForkliftSpecs from '@/components/specs/ForkliftSpecs'
import TyreSpecs from '@/components/specs/TyreSpecs'
import PalletTruckSpecs from '@/components/specs/PalletTruckSpecs'
import StackerSpecs from '@/components/specs/StackerSpecs'

function toPlainText(blocks: PortableTextBlock[] = []) {
  if (!blocks || !Array.isArray(blocks)) return ''
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return ''
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (block.children as any[]).map((child: { text: string }) => child.text).join('')
    })
    .join('\n\n')
}

export const revalidate = 60

const SIMILAR_PRODUCTS_QUERY = `
  *[_type == "product" && category == $category && _id != $currentId] | order(_createdAt desc)[0...4] {
    _id,
    "name": coalesce(name.en, name),
    "slug": slug.current,
    "imageUrl": images[0].asset->url,
    category,
    price,
    specifications {
        load_capacity,
        power_type,
        lift_height
    },
    tyre_specifications
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
    title: `${productName} | iLift`,
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
  const specs = product.specifications || {}
  const tyreSpecs = product.tyre_specifications || {}

  // Determine which Category Specs to render
  const renderCategorySpecs = () => {
    const category = product.category

    if (category === 'forklift' || category === 'reach_truck' || category === 'heavy_duty_forklift') {
      return <ForkliftSpecs product={product} />
    }
    if (category === 'parts_tyres') {
      return <TyreSpecs product={product} />
    }
    if (category === 'pallet_truck') {
      return <PalletTruckSpecs product={product} />
    }
    if (category === 'stacker') {
      return <StackerSpecs product={product} />
    }

    // Default / Fallback for 'spare_parts', 'warehouse', etc.
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900 uppercase border-b border-slate-200 pb-4">Standard Specifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {/* Standard Specs Loop */}
          {Object.entries(specs)
            .filter(([key]) => key !== 'customSpecs' && typeof specs[key] !== 'object')
            .map(([key, value]) => (
              <div key={key} className="flex items-center justify-between py-4 border-b border-slate-100 group hover:bg-slate-50 px-4 -mx-4 rounded-lg transition-colors">
                <span className="font-medium text-slate-500 capitalize">{key.replace(/_/g, ' ')}</span>
                <span className="text-slate-900 font-bold">{String(value)}</span>
              </div>
            ))}

          {/* Custom Specs */}
          {specs.customSpecs && Array.isArray(specs.customSpecs) && (
            specs.customSpecs.map((spec: { key: string; value: string }, idx: number) => (
              <div key={`custom-${idx}`} className="flex items-center justify-between py-4 border-b border-slate-100 group hover:bg-slate-50 px-4 -mx-4 rounded-lg transition-colors">
                <span className="font-medium text-slate-500 capitalize">{spec.key}</span>
                <span className="text-slate-900 font-bold">{spec.value}</span>
              </div>
            ))
          )}
        </div>
        {Object.keys(specs).length === 0 && !product.tyre_specifications && (
          <div className="p-8 text-slate-500 text-center bg-slate-50 rounded-lg">
            Specification details available on request. Please contact support.
          </div>
        )}
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-20">

      {/* 1. NEW HERO SECTION (Split + Stats) */}
      <ProductDetailHero product={product} />

      {/* 3. DETAILED CONTENT (Tabs) */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-16">

        {/* TABBED CONTENT */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <Tabs defaultValue="description" className="w-full">
            <div className="bg-slate-50/50 border-b border-slate-200 px-6">
              <TabsList className="flex w-full sm:w-auto h-16 bg-transparent gap-8">
                <TabsTrigger
                  value="description"
                  className="h-full rounded-none border-b-2 border-transparent px-2 data-[state=active]:bg-transparent data-[state=active]:border-b-red-600 data-[state=active]:text-red-700 data-[state=active]:shadow-none text-slate-500 font-bold uppercase tracking-wide text-sm transition-all hover:text-slate-900"
                >
                  Product Overview
                </TabsTrigger>
                <TabsTrigger
                  value="specs"
                  className="h-full rounded-none border-b-2 border-transparent px-2 data-[state=active]:bg-transparent data-[state=active]:border-b-red-600 data-[state=active]:text-red-700 data-[state=active]:shadow-none text-slate-500 font-bold uppercase tracking-wide text-sm transition-all hover:text-slate-900"
                >
                  Technical Specifications
                </TabsTrigger>
                <TabsTrigger
                  value="shipping"
                  className="h-full rounded-none border-b-2 border-transparent px-2 data-[state=active]:bg-transparent data-[state=active]:border-b-red-600 data-[state=active]:text-red-700 data-[state=active]:shadow-none text-slate-500 font-bold uppercase tracking-wide text-sm transition-all hover:text-slate-900"
                >
                  Logistics & Support
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-8 lg:p-12 min-h-[300px]">

              {/* Description Tab */}
              <TabsContent value="description" className="mt-0 space-y-8 animate-in fade-in-50 duration-300">
                <div className="grid lg:grid-cols-[2fr_1fr] gap-12">
                  <div className="prose prose-slate prose-lg max-w-none text-slate-600">
                    <h3 className="text-2xl font-black text-slate-900 uppercase mb-6">Engineered for Excellence</h3>
                    {product.description ? (
                      <PortableText value={product.description} />
                    ) : (
                      <p>Detailed product description not available. Please check the specifications for more details.</p>
                    )}

                    {/* Highlights Section */}
                    {((specs?.load_capacity || specs?.lift_height || specs?.power_type) || (tyreSpecs?.type || tyreSpecs?.size)) && (
                      <div className="mt-8 bg-slate-50 p-6 rounded-xl border border-slate-100">
                        <h4 className="font-bold text-slate-900 uppercase tracking-wider text-sm mb-4">Key Highlights</h4>
                        <ul className="space-y-2 list-none p-0 m-0">
                          {formatRange(specs?.load_capacity) !== 'N/A' && (
                            <li className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-red-600 rounded-full" />
                              <span className="font-bold text-slate-900">
                                {(() => {
                                  const val = formatRange(specs.load_capacity)
                                  if (val.toLowerCase().includes('kg')) return val
                                  return `${val} kg`
                                })()}
                              </span>
                              <span className="text-slate-500">Rated Load Capacity</span>
                            </li>
                          )}
                          {tyreSpecs?.size && (
                            <li className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-red-600 rounded-full" />
                              <span className="font-bold text-slate-900">{tyreSpecs.size}</span>
                              <span className="text-slate-500">Size</span>
                            </li>
                          )}
                          {formatRange(specs?.lift_height) !== 'N/A' && (
                            <li className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-red-600 rounded-full" />
                              <span className="font-bold text-slate-900">
                                {(() => {
                                  const val = formatRange(specs.lift_height)
                                  if (val.toLowerCase().includes('mm')) return val
                                  return `${val} mm`
                                })()}
                              </span>
                              <span className="text-slate-500">Maximum Lifting Height</span>
                            </li>
                          )}
                          {specs?.power_type && (
                            <li className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-red-600 rounded-full" />
                              <span className="font-bold text-slate-900">{specs.power_type}</span>
                              <span className="text-slate-500">Power System</span>
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Tab CTA */}
                  <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 h-fit sticky top-24">
                    <h4 className="font-black text-xl text-slate-900 mb-2">Interested in this Model?</h4>
                    <p className="text-slate-500 text-sm mb-6">Get a custom quote based on your specific fleet requirements.</p>
                    <Link href="/enquiry" className="flex items-center justify-center w-full py-4 bg-red-600 text-white font-bold uppercase tracking-wider rounded-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-red-200">
                      Get a Quote
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </TabsContent>

              {/* Specs Tab */}
              <TabsContent value="specs" className="mt-0 animate-in fade-in-50 duration-300">
                {renderCategorySpecs()}

                <div className="col-span-full mt-12 flex justify-center border-t border-slate-100 pt-8">
                  <DownloadSpecButton
                    productName={productName}
                    description={toPlainText(product.description)}
                    specifications={product.specifications || {}}
                    logistics={product.logistics}
                    support={product.support}
                  />
                </div>
              </TabsContent>

              {/* Shipping Tab */}
              <TabsContent value="shipping" className="mt-0 animate-in fade-in-50 duration-300">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex gap-4 items-start p-6 bg-blue-50/50 rounded-xl border border-blue-100">
                    <div className="bg-white p-3 rounded-full shadow-sm text-blue-600">
                      <Truck className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                        {product.logistics?.shipping_details || "Shipping details available upon request."}
                        <br />
                        {product.logistics?.lead_time && (
                          <>
                            Typical lead time: <span className="font-semibold text-slate-900">{product.logistics.lead_time}</span>.
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start p-6 bg-green-50/50 rounded-xl border border-green-100">
                    <div className="bg-white p-3 rounded-full shadow-sm text-green-600">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg mb-2">Warranty & Support</h4>
                      <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                        {product.support?.warranty_period && (
                          <>
                            Every unit comes with a <span className="font-semibold text-slate-900">{product.support.warranty_period}</span>.
                            <br />
                          </>
                        )}
                        {product.support?.support_coverage || "Support coverage details available upon request."}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* 4. RECOMMENDED PRODUCTS (Zoomlion Style) */}
        <RecommendedProducts products={similarProducts} />

        {/* 5. SERVICES ROW (Bottom) */}
        <ProductFeatures />

      </div>
    </main>
  )
}