export default {
    name: 'resource',
    title: 'Resource',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
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
            validation: (Rule: any) => Rule.required(),
        },
        {
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
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'url',
            title: 'External URL (YouTube / PDF Link)',
            type: 'url',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'description',
            title: 'Resource Description',
            description: 'Brief details about this file or video.',
            type: 'text',
        },
    ],
}
