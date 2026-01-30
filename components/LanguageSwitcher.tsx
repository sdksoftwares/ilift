'use client'

import { useEffect, useState } from 'react'
import { Globe } from 'lucide-react'

export default function LanguageSwitcher() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // 1. Check if script is already present to prevent duplicates
    if (document.getElementById('google-translate-script')) {
      return
    }

    // 2. Define the callback function globally BEFORE loading script
    // @ts-expect-error
    window.googleTranslateElementInit = () => {
      // @ts-expect-error
      if (window.google && window.google.translate) {
        // @ts-expect-error
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            // Limit to South African languages + Major International Trade languages
            includedLanguages: 'en,af,zu,xh,fr,pt,es,de,zh-CN,hi,ar,ru,ja',
            // @ts-expect-error
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          'google_translate_element'
        )
        setIsReady(true)
      }
    }

    // 3. Manually create and append the script tag
    const script = document.createElement('script')
    script.id = 'google-translate-script'
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Optional: Cleanup if needed
    }
  }, [])

  return (
    <div className="relative group min-w-[100px]">
      {/* 
        1. VISUAL LAYER: What the user sees 
        This is always visible and consistent.
      */}
      <div className="flex items-center gap-2 border border-blue-100 rounded-full px-3 py-1.5 bg-sky-50 hover:bg-sky-100 transition-colors cursor-pointer h-9 w-full justify-center">
        <Globe className="h-4 w-4 text-blue-600 flex-shrink-0" />
        <span className="text-xs text-blue-900 font-bold">Global</span>
      </div>

      {/* 
        2. FUNCTIONAL LAYER: The Google Widget (Hidden but Clickable)
        We position this absolutely over the visual layer with opacity 0.
        When the user clicks the "Visual Layer", they are actually clicking this invisible widget.
      */}
      <div
        id="google_translate_element"
        className="absolute inset-0 opacity-0 overflow-hidden z-50 cursor-pointer"
        style={{ transform: 'scale(1.5)', transformOrigin: 'top left' }}
      />

      {/* 
        3. STYLES: 
        We still need to style the POPUP menu that appears after clicking.
        We can't style the internal widget text easily, so we hide it completely with the overlay method.
        But the dropdown menu itself (google-te-menu-frame) needs to look good.
      */}
      <style jsx global>{`
        /* Hide the top frame "Translated by..." */
        .goog-te-banner-frame {
          display: none !important;
        }
        body {
          top: 0px !important;
        }
        
        /* Ensure the widget inside our container fills it so clicks work */
        .goog-te-gadget-simple {
          width: 100% !important;
          height: 100% !important;
        }

        /* Style the dropdown menu that appears ON CLICK */
        .goog-te-menu-frame {
          box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1) !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 0.75rem !important;
          z-index: 999999 !important;
        }
      `}</style>
    </div>
  )
}