'use client'

import { createContext, useContext, useState } from 'react'
import { type Channel } from '@/lib/channels'

interface PlaylistSheetContextValue {
  channel: Channel | null
  open: (channel: Channel) => void
  close: () => void
}

const PlaylistSheetContext = createContext<PlaylistSheetContextValue | null>(null)

export function PlaylistSheetProvider({ children }: { children: React.ReactNode }) {
  const [channel, setChannel] = useState<Channel | null>(null)

  return (
    <PlaylistSheetContext.Provider value={{
      channel,
      open: setChannel,
      close: () => setChannel(null),
    }}>
      {children}
    </PlaylistSheetContext.Provider>
  )
}

export function usePlaylistSheet() {
  const ctx = useContext(PlaylistSheetContext)
  if (!ctx) throw new Error('usePlaylistSheet must be used within PlaylistSheetProvider')
  return ctx
}
