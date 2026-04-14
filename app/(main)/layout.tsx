import Providers from '../providers'
import PhoneFrame from '@/components/PhoneFrame'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <PhoneFrame>
        {children}
      </PhoneFrame>
    </Providers>
  )
}
