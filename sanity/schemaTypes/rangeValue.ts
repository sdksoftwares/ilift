import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'rangeValue',
    title: 'Range Or Value',
    type: 'object',
    fields: [
        defineField({
            name: 'min',
            title: 'Minimum / Single Value',
            type: 'number',
        }),
        defineField({
            name: 'max',
            title: 'Maximum (Optional)',
            type: 'number',
            description: 'Leave empty if it is a fixed value',
        }),
        defineField({
            name: 'unit',
            title: 'Unit',
            type: 'string',
            options: {
                list: [
                    'kg', 'mm', 'm', 'V', 'Ah', 'km/h', 'kW', 'inch', '%', 'deg'
                ]
            }
        }),
        defineField({
            name: 'displayValue',
            title: 'Custom Display Text',
            type: 'string',
            description: 'Override automatic formatting (e.g. "3000 - 5000 mm")',
        }),
    ],
})
