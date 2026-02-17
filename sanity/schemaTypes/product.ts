import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Industrial Machinery',
  type: 'document',
  groups: [
    { name: 'main', title: 'Main Details' },
    { name: 'media', title: 'Media' },
    { name: 'specs', title: 'Technical Specs' },
    { name: 'logistics', title: 'Logistics & Support' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'object',
      group: 'main',
      fields: [
        { name: 'en', title: 'Name', type: 'string' },
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'main',
      options: { source: 'name.en', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'main',
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

    // --- SUBCATEGORIES ---

    // 1. Forklift Subcategories
    defineField({
      name: 'sub_category_forklift',
      title: 'Forklift Type',
      type: 'string',
      group: 'main',
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
      group: 'main',
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
      group: 'main',
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
      group: 'main',
      options: {
        list: [
          { title: 'Solid Resilient', value: 'solid_tyre_resilient' },
          { title: 'Solid Press-on', value: 'solid_tyre_press_on' },
          { title: 'Solid Non Marking', value: 'solid_tyre_non_marking' },
          { title: 'Solid Skid Steer', value: 'solid_tyre_skid_steer' },
          { title: 'Solid tyre & rims', value: 'solid_tyre_rims' },
        ]
      },
      hidden: ({ document }) => document?.category !== 'parts_tyres',
    }),

    // 5. Spare Parts Subcategories
    defineField({
      name: 'sub_category_spares',
      title: 'Spare Part Type',
      type: 'string',
      group: 'main',
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
          // Battery Specifics
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
      group: 'main',
      initialValue: false,
    }),
    defineField({
      name: 'featuredRank',
      title: 'Homepage Rank (1-8)',
      type: 'number',
      group: 'main',
      validation: (rule) => rule.min(1).max(8).integer(),
      hidden: ({ document }) => !document?.isFeatured,
    }),
    defineField({
      name: 'images',
      title: 'Product Gallery',
      type: 'array',
      group: 'media',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'description',
      title: 'Product Description',
      type: 'array',
      group: 'main',
      of: [{ type: 'block' }],
    }),

    // --- TECHNICAL SPECIFICATIONS (Category Specific) ---

    // A. Machinery Specs (General)
    defineField({
      name: 'specifications',
      title: 'Standard Specifications',
      type: 'object',
      group: 'specs',
      description: 'Used for general machinery specs if no specific group is matched.',
      hidden: ({ document }) => ['parts_tyres', 'spare_parts'].includes(document?.category as string),
      fields: [
        {
          name: 'specification_sheet',
          title: 'Specification Sheet (PDF/Doc)',
          type: 'file',
          options: {
            accept: '.pdf,.doc,.docx'
          },
          description: 'Upload a PDF or DOCX file. If present, the "Download Spec Sheet" button will download this file instead of generating one.'
        },
        {
          name: 'load_capacity',
          title: 'Load Capacity',
          type: 'rangeValue' // Changed from number to rangeValue
        },
        {
          name: 'lift_height',
          title: 'Lift Height',
          type: 'rangeValue' // Changed from number to rangeValue
        },
        {
          name: 'power_type',
          title: 'Power Type',
          type: 'string',
          options: { list: ['Electric', 'Diesel', 'LPG', 'Manual'] },
        },
        {
          name: 'tyre_type', // New Editable Field
          title: 'Tyre Type',
          type: 'string',
          description: 'e.g. Polyurethane, Nylon, Rubber (Leave empty to use category default)',
        },
        {
          name: 'battery_voltage',
          title: 'Battery Voltage',
          type: 'rangeValue'
        },
        {
          name: 'fork_length',
          title: 'Fork Length',
          type: 'rangeValue'
        },
        {
          name: 'turning_radius',
          title: 'Turning Radius',
          type: 'rangeValue'
        },
        // Legacy support / quick field
        {
          name: 'customSpecs',
          title: 'Additional Specifications',
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

    // B. Tyre Specifications
    defineField({
      name: 'tyre_specifications',
      title: 'Tyre Specifications',
      type: 'object',
      group: 'specs',
      hidden: ({ document }) => document?.category !== 'parts_tyres',
      fields: [
        { name: 'size', title: 'Tyre Size', type: 'string' },
        { name: 'rim_size', title: 'Rim Size', type: 'string' },
        { name: 'pattern', title: 'Pattern', type: 'string' },
        { name: 'type', title: 'Type', type: 'string', options: { list: ['Solid', 'Pneumatic', 'Cushion', 'Non-Marking'] } },
        { name: 'width', title: 'Section Width', type: 'rangeValue' },
        { name: 'diameter', title: 'Outer Diameter', type: 'rangeValue' },
      ]
    }),

    // --- LOGISTICS ---
    defineField({
      name: 'logistics',
      title: 'Logistics & Shipping',
      type: 'object',
      group: 'logistics',
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
      group: 'logistics',
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