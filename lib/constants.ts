export interface ProductMenuItem {
    name: string
    href: string
    image: string
    subcategories?: { name: string; href: string }[]
}

export const PRODUCTS_MENU: ProductMenuItem[] = [
    {
        name: "Fork Lifts",
        href: "/products?category=forklift",
        image: "/images/fk2.png",
        subcategories: [
            { name: "Electric", href: "/products?category=forklift_electric" },
            { name: "Diesel", href: "/products?category=forklift_diesel" },
            { name: "LPG", href: "/products?category=forklift_lpg" },
        ]
    },
    {
        name: "Stacker",
        href: "/products?category=stacker",
        image: "/images/stac.png",
        subcategories: [
            { name: "Electric", href: "/products?category=stacker_electric" },
            { name: "Manual", href: "/products?category=stacker_manual" },
        ]
    },
    {
        name: "Reach Truck",
        href: "/products?category=reach_truck",
        image: "/images/rchtrk.png" // Fallback image
    },
    {
        name: "Heavy Duty Fork Lift",
        href: "/products?category=heavy_duty_forklift",
        image: "/images/fk1.png" // Fallback image
    },
    {
        name: "Pallet Truck",
        href: "/products?category=pallet_truck",
        image: "/images/pllt.png",
        subcategories: [
            { name: "Fully Electric", href: "/products?category=pallet_truck_electric" },
            { name: "Semi Electric", href: "/products?category=pallet_truck_semi_electric" },
            { name: "Manual Hand Pallet", href: "/products?category=pallet_truck_manual" },
        ]
    },
    {
        name: "Solid Tyre",
        href: "/products?category=parts_tyres",
        image: "/images/tym.png", // Fallback image
        subcategories: [
            { name: "Solid Resilient", href: "/products?category=solid_tyre_resilient" },
            { name: "Solid Press-on", href: "/products?category=solid_tyre_press_on" },
            { name: "Solid Non Marking", href: "/products?category=solid_tyre_non_marking" },
            { name: "Solid Skid Steer", href: "/products?category=solid_tyre_skid_steer" },
            { name: '18 x 7 - 8 / 4.33"', href: "/products?category=solid_tyre_18x7-8_4.33" },
            { name: '6.00 - 9 / 4.00"', href: "/products?category=solid_tyre_600-9_4.00" },
            { name: '6.50 - 10 / 5.00"', href: "/products?category=solid_tyre_650-10_5.00" },
            { name: '7.00 - 12 / 5.00"', href: "/products?category=solid_tyre_700-12_5.00" },
            { name: '8.15 - 15 / 7.00"', href: "/products?category=solid_tyre_815-15_7.00" },
            { name: '8.25 - 15 / 6.50"', href: "/products?category=solid_tyre_825-15_6.50" },
        ]
    },
]

export const SPARE_PARTS_MENU = [
    { name: "Consumables", href: "/products?category=spares_consumables" },
    { name: "Engine", href: "/products?category=spares_engine" },
    { name: "Hydraulic Parts", href: "/products?category=spares_hydraulic" },
    { name: "Electrical Parts", href: "/products?category=spares_electrical" },
    {
        name: "Battery",
        href: "/products?category=spares_battery",
        subcategories: [
            { name: "Wet Cell", href: "/products?category=spares_battery_wet" },
            { name: "Lithium ion", href: "/products?category=spares_battery_lithium" },
        ]
    },
    { name: "Brake Parts", href: "/products?category=spares_brake" },
    { name: "Transmission", href: "/products?category=spares_transmission" },
    { name: "Wheels", href: "/products?category=spares_wheels" },
]

export const SERVICES_MENU = [
    { name: "Installation Support", href: "/services/installation" },
    { name: "Maintenance & AMC", href: "/services/amc" },
    { name: "Part Sourcing", href: "/services/sourcing" },
    { name: "On-site Inspection", href: "/services/inspection" },
]
