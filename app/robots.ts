import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ilift.co.in'

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/studio/', // Disallow Sanity Studio
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
