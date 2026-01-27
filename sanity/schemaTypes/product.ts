import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Industrial Machinery',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name (Localized)',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'hi', title: 'Hindi', type: 'string' },
        { name: 'fr', title: 'French', type: 'string' },
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name.en', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Forklift', value: 'forklift' },
          { title: 'Electric Stacker', value: 'stacker' },
          { title: 'Pallet Truck', value: 'pallet_truck' },
          { title: 'Warehouse Equipment', value: 'warehouse' },
          { title: 'Tyres', value: 'tyres' },
          { title: 'Spare Parts', value: 'spare_parts' },
          { title: 'Other / Custom', value: 'other' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Product Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'specifications',
      title: 'Technical Specifications',
      type: 'object',
      fields: [
        // Machinery Specs (Forklift, Stacker, Pallet Truck, Warehouse)
        {
          name: 'load_capacity',
          title: 'Load Capacity (kg)',
          type: 'number',
          hidden: ({ document }) => !['forklift', 'stacker', 'pallet_truck', 'warehouse', 'other'].includes(document?.category as string)
        },
        {
          name: 'lift_height',
          title: 'Lift Height (mm)',
          type: 'number',
          hidden: ({ document }) => !['forklift', 'stacker', 'warehouse', 'other'].includes(document?.category as string)
        },
        {
          name: 'power_type',
          title: 'Power Type',
          type: 'string',
          options: { list: ['Electric', 'Diesel', 'LPG', 'Manual'] },
          hidden: ({ document }) => !['forklift', 'stacker', 'pallet_truck', 'other'].includes(document?.category as string)
        },
        {
          name: 'battery_voltage',
          title: 'Battery Voltage (V)',
          type: 'string',
          hidden: ({ document }) => !['forklift', 'stacker', 'pallet_truck', 'other'].includes(document?.category as string || '') || (document?.specifications as any)?.power_type === 'Manual'
        },

        // Tyre Specs
        {
          name: 'tyre_size',
          title: 'Tyre Size',
          type: 'string',
          hidden: ({ document }) => document?.category !== 'tyres' && document?.category !== 'other'
        },
        {
          name: 'tyre_type',
          title: 'Tyre Type',
          type: 'string',
          options: { list: ['Solid', 'Pneumatic', 'Cushion', 'Non-Marking'] },
          hidden: ({ document }) => document?.category !== 'tyres' && document?.category !== 'other'
        },

        // Spare Parts / Compatible Brands
        {
          name: 'compatible_brands',
          title: 'Compatible Brands',
          type: 'string',
          description: 'e.g., Toyota, Godrej, Voltas',
          hidden: ({ document }) => document?.category !== 'spare_parts' && document?.category !== 'tyres' && document?.category !== 'other'
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name.en',
      media: 'images.0',
    },
  },
})