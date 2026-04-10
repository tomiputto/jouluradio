'use client'

import Image from 'next/image'
import { useDrawer } from '@/context/DrawerContext'
import { useLanguage } from '@/context/LanguageContext'

const navItems = [
  { key: 'home', fi: 'Etusivu', en: 'Home', sv: 'Startsida' },
  { key: 'frequencies', fi: 'Taajuudet', en: 'Frequencies', sv: 'Frekvenser' },
  { key: 'news', fi: 'Ajankohtaista', en: 'News', sv: 'Aktuellt' },
  { key: 'events', fi: 'Tapahtumat', en: 'Events', sv: 'Evenemang' },
  { key: 'info', fi: 'Info', en: 'Info', sv: 'Info' },
]

export default function NavigationDrawer() {
  const { isOpen, close } = useDrawer()
  const { locale } = useLanguage()

  return (
    <>
      {/* Backdrop */}
      <div
        className="absolute inset-0 z-80 bg-black/40 transition-opacity duration-300"
        style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }}
        onClick={close}
      />

      {/* Drawer */}
      <div
        className="absolute top-0 right-0 bottom-0 z-90 w-[85%] bg-white flex flex-col transition-transform duration-300 ease-in-out rounded-tl-[24px] rounded-bl-[24px]"
        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        {/* Header row */}
        <div className="flex items-center justify-between px-[20px] pt-[20px] pb-[24px]">
          <span className="text-[#333] text-[18px] font-extrabold">Valikko</span>
          <button
            onClick={close}
            className="flex size-[36px] items-center justify-center rounded-full bg-[#f2f2f7]"
            aria-label="Sulje"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="#333" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex flex-col pt-[8px]">
          {navItems.map((item) => {
            const label = item[locale as 'fi' | 'en' | 'sv']
            const isActive = item.key === 'home'
            return (
              <button
                key={item.key}
                onClick={isActive ? close : undefined}
                className="flex items-center px-[20px] h-[56px] text-left mx-[8px] rounded-[10px]"
                style={isActive ? { background: 'rgba(141, 36, 34, 0.06)' } : {}}
              >
                <span
                  className={`text-[16px] font-semibold ${isActive ? 'text-[#8d2422]' : 'text-[#333]'}`}
                >
                  {label}
                </span>
              </button>
            )
          })}
        </nav>

        {/* Some ikonit */}
        <div className="flex items-center gap-[4px] px-[12px] mt-auto pb-[32px]">
          <a href="#" aria-label="Instagram" className="flex size-[44px] items-center justify-center">
            <Image src="/instagram.png" alt="Instagram" width={24} height={24} className="object-contain" />
          </a>
          <a href="#" aria-label="Facebook" className="flex size-[44px] items-center justify-center">
            <Image src="/facebook.png" alt="Facebook" width={24} height={24} className="object-contain" />
          </a>
        </div>
      </div>
    </>
  )
}
