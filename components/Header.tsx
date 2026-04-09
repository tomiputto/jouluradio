import Image from 'next/image'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-[56px] items-center bg-white px-[16px]">
      {/* Logo */}
      <Image src="/logo.svg" alt="Jouluradio" height={36} width={60} className="object-contain" />

      <div className="flex-1" />

      {/* Right side */}
      <div className="flex items-center gap-[4px]">
        {/* Instagram */}
        <a href="#" aria-label="Instagram" className="flex size-[44px] items-center justify-center">
          <Image src="/instagram.png" alt="Instagram" width={24} height={24} className="object-contain" />
        </a>

        {/* Facebook */}
        <a href="#" aria-label="Facebook" className="flex size-[44px] items-center justify-center">
          <Image src="/facebook.png" alt="Facebook" width={24} height={24} className="object-contain" />
        </a>

        {/* Language */}
        <div className="flex items-center gap-[4px] px-[8px]">
          <span className="text-black text-[12px] font-semibold">FI</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Hamburger */}
        <button className="flex size-[44px] items-center justify-center" aria-label="Valikko">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </div>
    </header>
  )
}
