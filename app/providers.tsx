'use client'

import { AudioProvider } from '@/context/AudioContext'
import { PlaylistSheetProvider } from '@/context/PlaylistSheetContext'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AudioProvider>
      <PlaylistSheetProvider>{children}</PlaylistSheetProvider>
    </AudioProvider>
  )
}
