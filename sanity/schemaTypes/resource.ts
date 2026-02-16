import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'resource',
    title: 'Resource',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Forklifts', value: 'forklift' },
                    { title: 'Stackers', value: 'stacker' },
                    { title: 'Reach Trucks', value: 'reach_truck' },
                    { title: 'Heavy Duty Forklifts', value: 'heavy_duty_forklift' },
                    { title: 'Pallet Trucks', value: 'pallet_truck' },
                    { title: 'Tyres', value: 'parts_tyres' },
                    { title: 'Spare Parts', value: 'spare_parts' },
                    { title: 'General / Other', value: 'general' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Video', value: 'video' },
                    { title: 'PDF', value: 'pdf' },
                    { title: 'Manual', value: 'manual' },
                    { title: 'Guide', value: 'guide' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'url',
            title: 'External URL (YouTube / PDF Link)',
            type: 'url',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Resource Description',
            description: 'Brief details about this file or video.',
            type: 'text',
        }),
    ],
})
