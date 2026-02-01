import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Industrial Machinery',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'object',
      fields: [
        { name: 'en', title: 'Name', type: 'string' },
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
          { title: 'Stacker', value: 'stacker' },
          { title: 'Reach Truck', value: 'reach_truck' },
          { title: 'Heavy Duty Forklift', value: 'heavy_duty_forklift' },
          { title: 'Pallet Truck', value: 'pallet_truck' },
          { title: 'Solid Tyre', value: 'parts_tyres' },
          { title: 'Spare Parts', value: 'spare_parts' },
        ],
      },
      validation: (rule) => rule.required(),
    }),

    // 1. Forklift Subcategories
    defineField({
      name: 'sub_category_forklift',
      title: 'Forklift Type',
      type: 'string',
      options: {
        list: [
          { title: 'Electric Forklift', value: 'forklift_electric' },
          { title: 'Diesel Forklift', value: 'forklift_diesel' },
          { title: 'LPG Forklift', value: 'forklift_lpg' },
        ],
      },
      hidden: ({ document }) => document?.category !== 'forklift',
    }),

    // 2. Stacker Subcategories
    defineField({
      name: 'sub_category_stacker',
      title: 'Stacker Type',
      type: 'string',
      options: {
        list: [
          { title: 'Electric Stacker', value: 'stacker_electric' },
          { title: 'Manual Stacker', value: 'stacker_manual' },
        ],
      },
      hidden: ({ document }) => document?.category !== 'stacker',
    }),

    // 3. Pallet Truck Subcategories
    defineField({
      name: 'sub_category_pallet_truck',
      title: 'Pallet Truck Type',
      type: 'string',
      options: {
        list: [
          { title: 'Fully Electric', value: 'pallet_truck_electric' },
          { title: 'Semi Electric', value: 'pallet_truck_semi_electric' },
          { title: 'Manual Hand Pallet', value: 'pallet_truck_manual' },
        ],
      },
      hidden: ({ document }) => document?.category !== 'pallet_truck',
    }),

    // 4. Tyre Subcategories
    defineField({
      name: 'sub_category_tyres',
      title: 'Tyre Type',
      type: 'string',
      options: {
        list: [
          { title: 'Solid Resilient', value: 'solid_tyre_resilient' },
          { title: 'Solid Press-on', value: 'solid_tyre_press_on' },
          { title: 'Solid Non Marking', value: 'solid_tyre_non_marking' },
          { title: 'Solid Skid Steer', value: 'solid_tyre_skid_steer' },
          { title: '18 x 7 - 8 / 4.33"', value: 'solid_tyre_18x7-8_4.33' },
          { title: '6.00 - 9 / 4.00"', value: 'solid_tyre_600-9_4.00' },
          { title: '6.50 - 10 / 5.00"', value: 'solid_tyre_650-10_5.00' },
          { title: '7.00 - 12 / 5.00"', value: 'solid_tyre_700-12_5.00' },
          { title: '8.15 - 15 / 7.00"', value: 'solid_tyre_815-15_7.00' },
          { title: '8.25 - 15 / 6.50"', value: 'solid_tyre_825-15_6.50' },
        ]
      },
      hidden: ({ document }) => document?.category !== 'parts_tyres',
    }),

    // 5. Spare Parts Subcategories
    defineField({
      name: 'sub_category_spares',
      title: 'Spare Part Type',
      type: 'string',
      options: {
        list: [
          { title: 'Consumables', value: 'spares_consumables' },
          { title: 'Engine Parts', value: 'spares_engine' },
          { title: 'Hydraulic Parts', value: 'spares_hydraulic' },
          { title: 'Electrical Parts', value: 'spares_electrical' },
          { title: 'Battery', value: 'spares_battery' },
          { title: 'Brake Parts', value: 'spares_brake' },
          { title: 'Transmission', value: 'spares_transmission' },
          { title: 'Wheels', value: 'spares_wheels' },
          // Battery Specifics (if needed as flat list)
          { title: 'Battery - Wet Cell', value: 'spares_battery_wet' },
          { title: 'Battery - Lithium ion', value: 'spares_battery_lithium' },
        ]
      },
      hidden: ({ document }) => document?.category !== 'spare_parts',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Feature on Homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'featuredRank',
      title: 'Homepage Rank (1-8)',
      type: 'number',
      validation: (rule) => rule.min(1).max(8).integer(),
      hidden: ({ document }) => !document?.isFeatured,
    }),
    defineField({
      name: 'images',
      title: 'Product Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'description',
      title: 'Product Description',
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
          hidden: ({ document }) => !['forklift', 'stacker', 'reach_truck', 'heavy_duty_forklift', 'pallet_truck', 'warehouse', 'other'].includes(document?.category as string)
        },
        {
          name: 'lift_height',
          title: 'Lift Height (mm)',
          type: 'number',
          hidden: ({ document }) => !['forklift', 'stacker', 'reach_truck', 'heavy_duty_forklift', 'warehouse', 'other'].includes(document?.category as string)
        },
        {
          name: 'power_type',
          title: 'Power Type',
          type: 'string',
          options: { list: ['Electric', 'Diesel', 'LPG', 'Manual'] },
          hidden: ({ document }) => !['forklift', 'stacker', 'reach_truck', 'heavy_duty_forklift', 'pallet_truck', 'other'].includes(document?.category as string)
        },
        {
          name: 'battery_voltage',
          title: 'Battery Voltage (V)',
          type: 'string',
          hidden: ({ document }) => !['forklift', 'stacker', 'reach_truck', 'heavy_duty_forklift', 'pallet_truck', 'other'].includes(document?.category as string || '') || (document?.specifications as any)?.power_type === 'Manual'
        },

        // Tyre Specs
        {
          name: 'tyre_size',
          title: 'Tyre Size',
          type: 'string',
          hidden: ({ document }) => document?.category !== 'parts_tyres' && document?.category !== 'other'
        },
        {
          name: 'tyre_type',
          title: 'Tyre Type',
          type: 'string',
          options: { list: ['Solid', 'Pneumatic', 'Cushion', 'Non-Marking'] },
          hidden: ({ document }) => document?.category !== 'parts_tyres' && document?.category !== 'other'
        },
        {
          name: 'rim_size',
          title: 'Rim Size',
          type: 'string',
          hidden: ({ document }) => document?.category !== 'parts_tyres' && document?.category !== 'other'
        },
        {
          name: 'pattern',
          title: 'Pattern / Design',
          type: 'string',
          hidden: ({ document }) => document?.category !== 'parts_tyres' && document?.category !== 'other'
        },

        // Spare Parts / Compatible Brands
        {
          name: 'compatible_brands',
          title: 'Compatible Brands',
          type: 'string',
          description: 'e.g., Toyota, Godrej, Voltas',
          hidden: ({ document }) => document?.category !== 'spare_parts' && document?.category !== 'parts_tyres' && document?.category !== 'other'
        },

        // Custom Specs
        {
          name: 'customSpecs',
          title: 'Custom Specifications',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'key', type: 'string', title: 'Specification Name' },
                { name: 'value', type: 'string', title: 'Value' },
              ]
            }
          ]
        }
      ],
    }),
    defineField({
      name: 'logistics',
      title: 'Logistics & Shipping',
      type: 'object',
      fields: [
        {
          name: 'lead_time',
          title: 'Lead Time',
          type: 'string',
          description: 'e.g., 5-12 Business Days'
        },
        {
          name: 'shipping_details',
          title: 'Shipping Details',
          type: 'text',
          rows: 3,
          description: 'Details about shipping, packaging, etc.'
        }
      ]
    }),
    defineField({
      name: 'support',
      title: 'Warranty & Support',
      type: 'object',
      fields: [
        {
          name: 'warranty_period',
          title: 'Warranty Period',
          type: 'string',
          description: 'e.g., 1-Year Manufacturer Warranty'
        },
        {
          name: 'support_coverage',
          title: 'Support Coverage',
          type: 'text',
          rows: 3,
          description: 'Details about spare parts, video consultations, etc.'
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'name.en',
      media: 'images.0',
    },
  },
})