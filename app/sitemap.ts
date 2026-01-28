import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ilift.in'

    // 1. Static Routes
    const staticRoutes = [
        '',
        '/about',
        '/products',
        '/services',
        '/i-school',
        '/contact',
        '/enquiry',
        // '/studio' // Optional: Studio is usually for admin, maybe exclude from sitemap? including for now if public.
        // user didn't specify to exclude, but usually studio is not indexed. I'll exclude it to be safe, or include it if it's main nav.
        // It was in the list I made in the plan. I'll include it.
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // 2. Dynamic Routes: Products (from Sanity)
    // Fetch all products with slug and updatedAt
    const products = await client.fetch(`
    *[_type == "product"] {
      "slug": slug.current,
      _updatedAt
    }
  `)

    const productRoutes = products.map((product: any) => ({
        url: `${baseUrl}/products/${product.slug}`,
        lastModified: new Date(product._updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    // 3. Dynamic Routes: Services (Static Data)
    // These keys match the SERVICES_DATA in app/services/[slug]/page.tsx
    const serviceSlugs = ['installation', 'amc', 'sourcing', 'inspection']

    const serviceRoutes = serviceSlugs.map((slug) => ({
        url: `${baseUrl}/services/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    return [...staticRoutes, ...productRoutes, ...serviceRoutes]
}
