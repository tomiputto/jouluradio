'use client'

import { AudioProvider } from '@/context/AudioContext'
import { PlaylistSheetProvider } from '@/context/PlaylistSheetContext'
import { LanguageProvider } from '@/context/LanguageContext'
import { DrawerProvider } from '@/context/DrawerContext'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <DrawerProvider>
        <AudioProvider>
          <PlaylistSheetProvider>{children}</PlaylistSheetProvider>
        </AudioProvider>
      </DrawerProvider>
    </LanguageProvider>
  )
}
