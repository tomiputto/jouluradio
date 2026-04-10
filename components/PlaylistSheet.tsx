'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { usePlaylistSheet } from '@/context/PlaylistSheetContext'
import { useLanguage } from '@/context/LanguageContext'

const channelLogos: Record<string, string> = {
  jouluradio: '/Jouluradio.svg',
  julradion: '/julradion.png',
  kauneimmat: '/kauneimmat-joululaulut.png',
  lasten: '/lastenjouluradio.svg',
  popjoulu: '/popjoulu.png',
  rouhea: '/rouheajoulu.svg',
  klassinen: '/klassinenjoulu.svg',
  happy: '/happyholidays.svg',
}

interface Song {
  artist: string
  title: string
  time: string
}

export default function PlaylistSheet() {
  const { channel, close } = usePlaylistSheet()
  const { t } = useLanguage()
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!channel) { setSongs([]); return }
    setLoading(true)
    fetch(`/api/playlist?channel=${channel.metadataChannel}`)
      .then(r => r.json())
      .then(d => setSongs(d.songs ?? []))
      .finally(() => setLoading(false))
  }, [channel])

  const isOpen = !!channel

  return (
    <>
      {/* Backdrop */}
      <div
        className="absolute inset-0 z-60 bg-black/50 transition-opacity duration-300"
        style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }}
        onClick={close}
      />

      {/* Sheet */}
      <div
        className="absolute left-0 right-0 bottom-0 z-70 bg-white rounded-t-[24px] transition-transform duration-300 ease-out"
        style={{
          height: '75%',
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
        }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-[12px] pb-[8px]">
          <div className="h-[4px] w-[36px] rounded-full bg-black/15" />
        </div>

        {/* Header */}
        {channel && (
          <div className="flex items-center gap-[12px] px-[20px] pb-[16px]">
            <div
              className="flex size-[40px] shrink-0 items-center justify-center rounded-full overflow-hidden"
              style={{
                background: `linear-gradient(${channel.gradientAngle}deg, ${channel.gradientFrom}, ${channel.gradientTo})`,
              }}
            >
              {channelLogos[channel.id] && (
                <Image src={channelLogos[channel.id]} alt={channel.name} width={40} height={40} className="size-full object-cover" />
              )}
            </div>
            <div>
              <p className="text-black text-[16px] font-bold">{channel.name}</p>
              <p className="text-[#919191] text-[12px]">{t.lastSongs}</p>
            </div>
            <button onClick={close} className="ml-auto flex size-[36px] items-center justify-center rounded-full bg-[#f2f2f7]">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2l10 10M12 2L2 12" stroke="black" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        )}

        <div className="h-px bg-[#e0e0e0] mx-[20px]" />

        {/* Song list */}
        <div className="overflow-y-auto" style={{ height: 'calc(100% - 120px)' }}>
          {loading ? (
            <div className="flex justify-center pt-[40px]">
              <p className="text-[#919191] text-[14px]">{t.loading}</p>
            </div>
          ) : songs.length === 0 ? (
            <div className="flex justify-center pt-[40px]">
              <p className="text-[#919191] text-[14px]">{t.noData}</p>
            </div>
          ) : (
            songs.map((song, i) => (
              <div key={i}>
                <div className="flex items-center gap-[12px] px-[20px] py-[12px]">
                  <div className="flex size-[36px] shrink-0 items-center justify-center rounded-full bg-[#f2f2f7] text-[#919191] text-[12px] font-bold">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-black text-[14px] font-semibold truncate">{song.title}</p>
                    <p className="text-[#919191] text-[12px] truncate">{song.artist}</p>
                  </div>
                  {song.time && (
                    <p className="text-[#919191] text-[12px] shrink-0">{song.time}</p>
                  )}
                </div>
                {i < songs.length - 1 && <div className="h-px bg-[#f2f2f7] ml-[68px] mr-[20px]" />}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}
