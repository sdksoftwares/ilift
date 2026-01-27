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
                    { title: 'Pallet Trucks', value: 'pallet_truck' },
                    { title: 'Video Tutorials', value: 'video' },
                    { title: 'Manuals', value: 'manual' },
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
            name: 'thumbnail',
            title: 'Thumbnail',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'duration',
            title: 'Duration (for Videos) or Size (for PDFs)',
            type: 'string',
            description: 'e.g., "5:20" or "2.4 MB"',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
    ],
}
