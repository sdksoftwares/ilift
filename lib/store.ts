import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 1. Define the shape of a Product in the cart
export interface CartItem {
  _id: string
  name: string
  slug: string
  imageUrl: string
  category: string
  price?: number // <--- Added as optional, useful for the sales team context
}

interface CartState {
  items: CartItem[]
  isOpen: boolean 
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clearCart: () => void
  toggleCart: () => void
}

// 2. Create the Store with Persistence
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const currentItems = get().items
        // Prevent duplicates
        const exists = currentItems.find((i) => i._id === item._id)
        
        if (!exists) {
          set({ items: [...currentItems, item], isOpen: true }) 
        } else {
          set({ isOpen: true }) 
        }
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i._id !== id),
        }))
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: 'ilift-enquiry-cart',
    }
  )
)