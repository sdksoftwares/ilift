import { formatRange, RangeValue } from '@/lib/utils'

interface ProductProps {
    product: {
        tyre_specifications?: {
            size?: string
            type?: string
            pattern?: string
            rim_size?: string
            width?: RangeValue | number
            diameter?: RangeValue | number
        }
        sub_category_tyres?: string
        specifications?: {
            customSpecs?: { key: string; value: string }[]
        }
    }
}

export default function TyreSpecs({ product }: ProductProps) {
    const specs = product.tyre_specifications || {}
    const customSpecs = product.specifications?.customSpecs || []
    const subType = product.sub_category_tyres?.replace('solid_tyre_', '').replace(/_/g, ' ').toUpperCase() || 'INDUSTRIAL TYRE'

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4 pb-4 border-b border-slate-200">
                <div className="h-10 w-1 bg-red-600 rounded-full"></div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 uppercase">Tyre Specifications</h3>
                    <p className="text-sm text-slate-500 font-medium">{subType}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {/* Core Specs */}
                <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Build & Pattern</h4>

                    <SpecRow label="Tyre Size" value={specs.size} />
                    <SpecRow label="Type" value={specs.type} />
                    <SpecRow label="Pattern / Design" value={specs.pattern} />
                    <SpecRow label="Compatible Rim" value={specs.rim_size} />
                </div>

                {/* Dimensions */}
                <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Dimensions</h4>

                    <SpecRow label="Section Width" value={formatRange(specs.width)} />
                    <SpecRow label="Outer Diameter" value={formatRange(specs.diameter)} />
                </div>
            </div>

            {/* Custom Specs */}
            {customSpecs.length > 0 && (
                <div className="pt-6 border-t border-slate-100">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Additional Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {customSpecs.map((spec, idx) => (
                            <div key={idx} className="bg-slate-50 p-3 rounded-lg flex justify-between items-center text-sm">
                                <span className="font-medium text-slate-600">{spec.key}</span>
                                <span className="font-bold text-slate-900">{spec.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

function SpecRow({ label, value }: { label: string; value?: string | number | null }) {
    if (!value || value === 'N/A') return null
    return (
        <div className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0 group hover:bg-slate-50 transition-colors px-2 -mx-2 rounded">
            <span className="text-slate-500 font-medium">{label}</span>
            <span className="text-slate-900 font-bold">{value}</span>
        </div>
    )
}
