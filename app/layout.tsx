import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import PhoneFrame from '@/components/PhoneFrame'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Jouluradio',
  description: 'Suomalainen joulumusiikkipalvelu',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fi" className={`${plusJakartaSans.variable} h-full`}>
      <body className="min-h-full bg-[#e5e5ea] antialiased">
        <Providers>
          <PhoneFrame>
            {children}
          </PhoneFrame>
        </Providers>
      </body>
    </html>
  )
}
