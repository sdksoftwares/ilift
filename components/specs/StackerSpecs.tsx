import { formatRange, RangeValue } from '@/lib/utils'

interface ProductProps {
    product: {
        specifications?: {
            load_capacity?: RangeValue | number
            lift_height?: RangeValue | number
            power_type?: string
            fork_length?: RangeValue | number
            turning_radius?: RangeValue | number
            battery_voltage?: RangeValue | number
            customSpecs?: { key: string; value: string }[]
        }
        sub_category_stacker?: string
    }
}

export default function StackerSpecs({ product }: ProductProps) {
    const specs = product.specifications || {}
    const subType = product.sub_category_stacker?.replace('stacker_', '').toUpperCase() || 'STANDARD'

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4 pb-4 border-b border-slate-200">
                <div className="h-10 w-1 bg-red-600 rounded-full"></div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 uppercase">Stacker Specifications</h3>
                    <p className="text-sm text-slate-500 font-medium">{subType} SERIES</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {/* Core Specs */}
                <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Performance</h4>

                    <SpecRow label="Load Capacity" value={formatRange(specs.load_capacity)} />
                    <SpecRow label="Lift Height" value={formatRange(specs.lift_height)} />
                    <SpecRow label="Power Type" value={specs.power_type} />
                </div>

                {/* Dimensions */}
                <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Dimensions</h4>

                    <SpecRow label="Fork Length" value={formatRange(specs.fork_length)} />
                    <SpecRow label="Turning Radius" value={formatRange(specs.turning_radius)} />
                    {specs.battery_voltage && <SpecRow label="Battery Voltage" value={formatRange(specs.battery_voltage)} />}
                </div>
            </div>

            {/* Custom Specs */}
            {specs.customSpecs && specs.customSpecs.length > 0 && (
                <div className="pt-6 border-t border-slate-100">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Additional Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {specs.customSpecs.map((spec, idx) => (
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
