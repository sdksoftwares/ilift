'use client'

import { useCartStore } from '@/lib/store'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Trash2, FileText, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function CartDrawer() {
  // Connect to our Zustand store
  const { items, removeItem, isOpen, toggleCart } = useCartStore()

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-full sm:w-[400px] flex flex-col bg-white">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="flex items-center gap-2 text-slate-900">
            <FileText className="h-5 w-5 text-[#FFD700]" />
            Enquiry List ({items.length})
          </SheetTitle>
        </SheetHeader>

        {/* Empty State */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <p>Your list is empty.</p>
            <Button 
              variant="link" 
              onClick={toggleCart}
              className="text-[#FFD700] hover:text-yellow-600 font-semibold"
            >
              Browse Machinery
            </Button>
          </div>
        ) : (
          /* List of Items */
          <ScrollArea className="flex-1 -mx-6 px-6 py-4">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item._id} className="flex gap-4 items-start border-b border-slate-100 pb-4">
                  {/* Thumbnail */}
                  <div className="h-16 w-16 relative bg-slate-50 rounded-md overflow-hidden flex-shrink-0 border">
                     <Image 
                       src={item.imageUrl} 
                       alt={item.name}
                       fill
                       className="object-cover"
                     />
                  </div>
                  
                  {/* Text Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-500 mb-2">{item.category}</p>
                    <button 
                      onClick={() => removeItem(item._id)}
                      className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
                    >
                      <Trash2 className="h-3 w-3" /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        {/* Footer Actions */}
        {items.length > 0 && (
          <SheetFooter className="border-t pt-4">
            <Link href="/enquiry" onClick={toggleCart} className="w-full">
              <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 text-base">
                Request Bulk Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}