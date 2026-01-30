// lib/sanity.ts
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

// 1. Configuration
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // False = Fresh data instantly
})

// 2. Image Builder
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
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
  price,
  specifications {
    load_capacity,
    power_type,
    lift_height,
    tyre_size,
    tyre_type,
    compatible_brands
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
    price
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
    filters.push(`category == "${categoryStr}"`)
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
  const productCategories = new Set(products.map((p: any) => p.category).filter(Boolean))

  // 2. Add Standard Categories (Ensure these always appear)
  const standardCategories = [
    'forklifts',
    'forklifts_electric',
    'forklifts_diesel',
    'forklifts_lpg',
    'stacker',
    'stacker_electric',
    'stacker_manual',
    'reach_truck',
    'heavy_duty_forklift',
    'pallet_truck',
    'pallet_truck_electric',
    'pallet_truck_semi_electric',
    'pallet_truck_manual',
    'solid_tyre',
    'solid_tyre_resilient',
    'solid_tyre_press_on',
    'solid_tyre_non_marking',
    'solid_tyre_skid_steer',
    'solid_tyre_18x7-8_4.33',
    'solid_tyre_600-9_4.00',
    'solid_tyre_650-10_5.00',
    'solid_tyre_700-12_5.00',
    'solid_tyre_815-15_7.00',
    'solid_tyre_825-15_6.50',
    'spares_consumables',
    'spares_engine',
    'spares_hydraulic',
    'spares_electrical',
    'spares_battery',
    'spares_battery_wet',
    'spares_battery_lithium',
    'spares_brake',
    'spares_transmission',
    'spares_wheels',
    'spare_parts'
  ]

  standardCategories.forEach(cat => productCategories.add(cat))

  // 3. Convert to Array and Sort
  return Array.from(productCategories).sort() as string[]
}

// Fetch Single Product
export async function getProduct(slug: string) {
  return client.fetch(PRODUCT_BY_SLUG_QUERY, { slug }, { next: { revalidate: 0 } })
}