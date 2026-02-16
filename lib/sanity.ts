// lib/sanity.ts
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { PRODUCTS_MENU, SPARE_PARTS_MENU } from '@/lib/constants'

// 1. Configuration
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // False = Fresh data instantly
})

// 2. Image Builder
const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// 3. GROQ Queries

// Projection: Defines exactly what data we get back.
// UPDATED: "name" now safely grabs English name OR plain string name.
const productCardProjection = `
  _id,
  "name": coalesce(name.en, name),
  "slug": slug.current,
  "imageUrl": images[0].asset->url,
  category,
  "subCategory": coalesce(sub_category_forklift, sub_category_stacker, sub_category_pallet_truck, sub_category_tyres, sub_category_spares),
  price,
  isFeatured,
  featuredRank,
  specifications {
    load_capacity,
    power_type,
    lift_height,
    tyre_size,
    tyre_type,
    compatible_brands,
    customSpecs
  }
`

// Fetch a single product for the Details Page
export const PRODUCT_BY_SLUG_QUERY = `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    "name": coalesce(name.en, name),
    description,
    specifications,
    "images": images[].asset->url,
    "brochureUrl": brochure.asset->url,
    category,
    "subCategory": coalesce(sub_category_forklift, sub_category_stacker, sub_category_pallet_truck, sub_category_tyres, sub_category_spares),
    price,
    logistics,
    support
  }
`

// 4. Helper Functions

// Fetch Products with Smart Search & Filter
export async function getProducts(queryStr?: string, categoryStr?: string) {
  // Start with the base filter
  const filters = ['_type == "product"']

  // --- SMART SEARCH LOGIC ---
  if (queryStr) {
    // 1. Split search into individual words (e.g., "Toyota Stacker" -> ["Toyota", "Stacker"])
    const terms = queryStr.split(' ').filter(term => term.trim().length > 0)

    // 2. Create a filter for EACH word
    const termFilters = terms.map(term => {
      // Each word must appear in Name OR Description OR Category
      return `(
        name match "*${term}*" || 
        name.en match "*${term}*" || 
        description match "*${term}*" || 
        category match "*${term}*"
      )`
    })

    // 3. Combine word filters with AND (&&)
    // This ensures "Toyota Stacker" matches "Toyota Electric Stacker"
    if (termFilters.length > 0) {
      filters.push(`(${termFilters.join(' && ')})`)
    }
  }

  // Add Category Filter
  if (categoryStr && categoryStr !== 'all') {
    // UPDATED: Check both main category and any sub-category field
    // This allows "forklift_electric" to match the specific sub-category field
    filters.push(`(
      string::startsWith(category, "${categoryStr}") || 
      sub_category_forklift == "${categoryStr}" ||
      sub_category_stacker == "${categoryStr}" ||
      sub_category_pallet_truck == "${categoryStr}" ||
      sub_category_tyres == "${categoryStr}" ||
      sub_category_spares == "${categoryStr}"
    )`)
  }

  // Combine filters
  const filterString = filters.join(' && ')

  // Construct Query
  const query = `*[${filterString}] | order(_createdAt desc) {
    ${productCardProjection}
  }`

  console.log(`Smart Search Query: ${filterString}`)

  // Fetch with NO CACHE (Instant Updates)
  return client.fetch(query, {}, { next: { revalidate: 0 } })
}

// Fetch Unique Categories
export async function getCategories() {
  const query = `*[_type == "product"] { category }`
  const products = await client.fetch(query, {}, { next: { revalidate: 0 } })

  // 1. Get categories from actual products
  const productCategories = new Set(products.map((p: { category: string }) => p.category).filter(Boolean))

  // 2. Add Standard Categories (Dynamically generated from Constants)
  const standardCategories = new Set<string>()

  // Helper to extract category from href
  const extractCategory = (href: string) => {
    const match = href.match(/category=([^&]*)/)
    if (match && match[1]) {
      standardCategories.add(match[1])
    }
  }

  // Iterate PRODUCTS_MENU
  PRODUCTS_MENU.forEach(item => {
    extractCategory(item.href)
    item.subcategories?.forEach(sub => extractCategory(sub.href))
  })

  // Iterate SPARE_PARTS_MENU
  SPARE_PARTS_MENU.forEach(item => {
    extractCategory(item.href)
    // Check for subcategories if they exist on the union type
    if (item.subcategories) {
      item.subcategories.forEach(sub => extractCategory(sub.href))
    }
  })

  // Add hardcoded 'spare_parts' if not present, as it's a parent category often used
  standardCategories.add('spare_parts')

  standardCategories.forEach(cat => productCategories.add(cat))

  // 3. Convert to Array and Sort
  return Array.from(productCategories).sort() as string[]
}

// Fetch Featured Products (Homepage)
export async function getFeaturedProducts() {
  const query = `*[_type == "product" && isFeatured == true] | order(featuredRank asc) {
    ${productCardProjection}
  }`

  return client.fetch(query, {}, { next: { revalidate: 0 } })
}

// Fetch Single Product
export async function getProduct(slug: string) {
  return client.fetch(PRODUCT_BY_SLUG_QUERY, { slug }, { next: { revalidate: 0 } })
}