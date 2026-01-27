'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, FileText, Play, Filter, X, Download, ExternalLink, ChevronDown, BookOpen } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

// --- SANITY QUERY ---
const RESOURCES_QUERY = `*[_type == "resource"] {
  _id,
  title,
  type,
  category,
  url,
  thumbnail,
  duration,
  description
}`

interface Resource {
    _id: string;
    title: string;
    type: 'video' | 'pdf';
    category: string;
    url: string;
    thumbnail?: any;
    duration?: string;
    description?: string;
}

const CATEGORIES: { id: string; label: string }[] = [
    { id: 'all', label: 'All Resources' },
    { id: 'forklift', label: 'Forklifts' },
    { id: 'stacker', label: 'Stackers' },
    { id: 'pallet_truck', label: 'Pallet Trucks' },
    { id: 'video', label: 'Video Tutorials' },
    { id: 'manual', label: 'Manuals' },
];

import dynamic from 'next/dynamic'

// Dynamically import StarField3D
const StarField3D = dynamic(() => import('@/components/StarField3D'), { ssr: false })

export default function LibraryPage() {
    const searchParams = useSearchParams()
    const [resources, setResources] = useState<Resource[]>([])
    const [activeCategory, setActiveCategory] = useState<string>('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
    const [loading, setLoading] = useState(true)

    // Fetch Resources from Sanity
    useEffect(() => {
        const fetchResources = async () => {
            try {
                const data = await client.fetch(RESOURCES_QUERY)
                setResources(data)
            } catch (error) {
                console.error("Failed to fetch resources:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchResources()
    }, [])

    // Initialize filter from URL
    useEffect(() => {
        const categoryParam = searchParams.get('category')
        if (categoryParam && CATEGORIES.some(c => c.id === categoryParam)) {
            setActiveCategory(categoryParam)
        }
    }, [searchParams])

    // Filter Logic
    const filteredResources = resources.filter(resource => {
        const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase())

        let matchesCategory = true
        if (activeCategory === 'all') matchesCategory = true
        else if (activeCategory === 'video') matchesCategory = resource.type === 'video'
        else if (activeCategory === 'manual') matchesCategory = resource.type === 'pdf'
        else matchesCategory = resource.category === activeCategory

        return matchesSearch && matchesCategory
    })

    // Helper to extract YouTube Thumbnail
    const getYouTubeThumbnail = (url: string) => {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
        const match = url.match(regex)
        return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null
    }

    // Helper to get Embed URL
    const getEmbedUrl = (url: string) => {
        // Handle YouTube
        const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
        const ytMatch = url.match(ytRegex)
        if (ytMatch) {
            return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`
        }

        // Return original if not YouTube or if regex fails
        return url
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-20">

            {/* HEADER */}
            <div className="relative bg-slate-900 text-white pt-32 pb-20 px-4 overflow-hidden">
                {/* Background Effects */}
                <StarField3D />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black z-0 opacity-80" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0 mix-blend-overlay" />
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent z-10" />

                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 text-red-400 font-bold tracking-widest text-xs uppercase mb-4 border border-red-500/20 bg-red-500/10 px-3 py-1 rounded-full">
                                <BookOpen className="h-3 w-3" /> i-School Library
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 drop-shadow-sm">
                                Resource Center
                            </h1>
                            <p className="text-slate-400 max-w-2xl text-lg font-light leading-relaxed">
                                Access the complete archive of i-Lift operation manuals, safety guides, and technical video tutorials.
                            </p>
                        </motion.div>
                    </div>

                    {/* SEARCH & FILTER BAR */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl ring-1 ring-black/5 flex flex-col md:flex-row gap-2"
                    >
                        <div className="relative flex-1 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5 group-focus-within:text-red-400 transition-colors" />
                            <Input
                                placeholder="Search manuals, videos, guides..."
                                className="pl-12 h-14 bg-transparent border-none text-white focus-visible:ring-0 placeholder:text-slate-400 text-lg font-medium"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="hidden md:block w-px bg-white/10 my-3" />
                        <div className="flex overflow-x-auto gap-2 p-2 md:p-0 no-scrollbar items-center">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 ${activeCategory === cat.id
                                        ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] transform scale-105'
                                        : 'text-slate-300 hover:bg-white/5 hover:text-white border border-transparent hover:border-white/10'
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* RESOURCE GRID */}
            <div className="container mx-auto max-w-6xl px-4 py-12">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                    </div>
                ) : filteredResources.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="bg-slate-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                            <Search className="h-8 w-8 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-700">No resources found</h3>
                        <p className="text-slate-500">Try adjusting your search or category filter.</p>
                        <Button variant="link" onClick={() => { setSearchQuery(''); setActiveCategory('all') }} className="mt-2 text-red-600">
                            Clear filters
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredResources.map(resource => {
                            // Logic to determine thumbnail source
                            let thumbnailSrc = '/placeholder-video.jpg';
                            if (resource.thumbnail) {
                                thumbnailSrc = urlFor(resource.thumbnail).url();
                            } else if (resource.type === 'video') {
                                const ytThumb = getYouTubeThumbnail(resource.url);
                                if (ytThumb) thumbnailSrc = ytThumb;
                            }

                            return (
                                <motion.div
                                    key={resource._id}
                                    layoutId={`card-${resource._id}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all overflow-hidden group cursor-pointer flex flex-col"
                                    onClick={() => setSelectedResource(resource)}
                                >
                                    {/* THUMBNAIL AREA */}
                                    <div className="aspect-video bg-slate-100 relative overflow-hidden">
                                        {resource.type === 'video' ? (
                                            <>
                                                <Image
                                                    src={thumbnailSrc}
                                                    alt={resource.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                                                    <div className="h-12 w-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                                        <Play className="h-5 w-5 text-red-600 ml-1" />
                                                    </div>
                                                </div>
                                                {resource.duration && (
                                                    <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded font-medium">
                                                        {resource.duration}
                                                    </span>
                                                )}
                                            </>
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center bg-slate-50 group-hover:bg-red-50/50 transition-colors">
                                                {resource.thumbnail ? (
                                                    <Image
                                                        src={urlFor(resource.thumbnail).url()}
                                                        alt={resource.title}
                                                        fill
                                                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                                    />
                                                ) : (
                                                    <FileText className="h-16 w-16 text-slate-300 group-hover:text-red-200 transition-colors" />
                                                )}
                                                <span className="absolute bottom-2 right-2 bg-slate-200 text-slate-600 text-xs px-2 py-0.5 rounded font-medium">
                                                    PDF
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* CONTENT */}
                                    <div className="p-5 flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-2">
                                            <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 capitalize">
                                                {resource.category.replace('_', ' ')}
                                            </Badge>
                                            {resource.duration && resource.type === 'pdf' && <span className="text-xs text-slate-400 font-medium">{resource.duration}</span>}
                                        </div>
                                        <h3 className="font-bold text-slate-900 line-clamp-2 md:text-lg mb-2 group-hover:text-red-600 transition-colors">
                                            {resource.title}
                                        </h3>

                                        <div className="mt-auto pt-4 flex items-center text-sm font-medium text-red-600">
                                            {resource.type === 'video' ? 'Watch Tutorial' : 'Read Document'}
                                            <ExternalLink className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* RESOURCE VIEWER MODAL */}
            <AnimatePresence>
                {selectedResource && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 sm:px-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setSelectedResource(null)}
                        />
                        <motion.div
                            layoutId={`card-${selectedResource._id}`}
                            className="relative bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            {/* MODAL HEADER */}
                            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-white z-10">
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900">{selectedResource.title}</h3>
                                    <span className="text-sm text-slate-500 capitalize">{selectedResource.category.replace('_', ' ')} • {selectedResource.type.toUpperCase()}</span>
                                </div>
                                <div className="flex gap-2">
                                    {selectedResource.type === 'pdf' && (
                                        <Button variant="outline" size="sm" className="gap-2" asChild>
                                            <a href={selectedResource.url} target="_blank" rel="noopener noreferrer">
                                                <Download className="h-4 w-4" /> Download
                                            </a>
                                        </Button>
                                    )}
                                    <button onClick={() => setSelectedResource(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                        <X className="h-6 w-6 text-slate-500" />
                                    </button>
                                </div>
                            </div>

                            {/* MODAL CONTENT */}
                            <div className="flex-1 bg-slate-900 relative overflow-hidden min-h-[400px] md:min-h-[500px]">
                                {selectedResource.type === 'video' ? (
                                    <iframe
                                        src={getEmbedUrl(selectedResource.url)}
                                        className="absolute inset-0 w-full h-full"
                                        title={selectedResource.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    /* PDF Viewer using generic object/iframe, or Google Viewer fallback */
                                    <iframe
                                        src={selectedResource.url}
                                        className="absolute inset-0 w-full h-full bg-white"
                                        title="PDF Viewer"
                                    />
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    )
}
