'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useDrawer } from '@/context/DrawerContext'
import { type Locale } from '@/lib/translations'

const locales: Locale[] = ['fi', 'en', 'sv']

export default function Header() {
  const { locale, setLocale } = useLanguage()
  const { open: openDrawer } = useDrawer()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 flex h-[56px] items-center bg-white px-[16px]">
      {/* Logo */}
      <Image src="/logo.svg" alt="Jouluradio" height={36} width={60} className="object-contain" />

      <div className="flex-1" />

      {/* Right side */}
      <div className="flex items-center gap-[4px]">
        {/* Instagram */}
        <a href="https://www.instagram.com/jouluradio/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex size-[44px] items-center justify-center">
          <Image src="/instagram.png" alt="Instagram" width={24} height={24} className="object-contain" />
        </a>

        {/* Facebook */}
        <a href="https://www.facebook.com/jouluradio/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex size-[44px] items-center justify-center">
          <Image src="/facebook.png" alt="Facebook" width={24} height={24} className="object-contain" />
        </a>

        {/* Language */}
        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-[5px] px-[8px] h-[44px] w-[58px]"
          >
            <span className="text-black text-[12px] font-semibold uppercase">{locale}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6l4 4 4-4" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {open && (
            <div className="absolute right-0 top-[44px] bg-white rounded-[8px] shadow-[0_4px_20px_rgba(0,0,0,0.15)] overflow-hidden z-50">
              {locales.map((l) => (
                <button
                  key={l}
                  onClick={() => { setLocale(l); setOpen(false) }}
                  className={`flex w-full items-center px-[16px] h-[40px] text-[13px] font-semibold uppercase hover:bg-[#f5f5f5] ${l === locale ? 'text-[#8d2422]' : 'text-black'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Hamburger */}
        <button onClick={openDrawer} className="flex size-[44px] items-center justify-center" aria-label="Valikko">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </div>
    </header>
  )
}
