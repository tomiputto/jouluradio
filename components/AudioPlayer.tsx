'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useAudio } from '@/context/AudioContext'
import { useLanguage } from '@/context/LanguageContext'
import { channels } from '@/lib/channels'

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

interface Props {
  expanded: boolean
  onExpand: () => void
  onCollapse: () => void
  onTouchStart: (e: React.TouchEvent) => void
  onTouchEnd: (e: React.TouchEvent) => void
}

export default function AudioPlayer({ expanded, onExpand, onCollapse, onTouchStart, onTouchEnd }: Props) {
  const { currentChannel, isPlaying, nowPlaying, toggle, play } = useAudio()
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const artist = nowPlaying?.artist || currentChannel?.currentArtist
  const title = nowPlaying?.title || currentChannel?.currentSong

  return (
    <>
      {/* Expanded panel — grows upward from above the collapsed bar */}
      <div
        className="absolute left-0 right-0 z-40 overflow-hidden bg-[#1a1a1a] transition-[height] duration-300 ease-in-out rounded-t-[36px]"
        style={{ bottom: '143px', height: expanded ? '637px' : '0px' }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-center pt-[16px] pb-[12px] shrink-0">
            <button onClick={onCollapse} className="flex size-[36px] items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Now playing */}
          <div className="flex items-center gap-[14px] px-[20px] pb-[16px] shrink-0">
            <div
              className="flex size-[56px] shrink-0 items-center justify-center rounded-full overflow-hidden"
              style={{
                background: currentChannel
                  ? `linear-gradient(${currentChannel.gradientAngle}deg, ${currentChannel.gradientFrom}, ${currentChannel.gradientTo})`
                  : 'linear-gradient(224deg, #590907, #8d2422)',
              }}
            >
              {currentChannel && channelLogos[currentChannel.id] && (
                <Image src={channelLogos[currentChannel.id]} alt={currentChannel.name} width={56} height={56} className="size-full object-cover" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-[15px] font-bold truncate">{title || '—'}</p>
              <p className="text-white/60 text-[13px] truncate">{artist || currentChannel?.label || ''}</p>
            </div>
            <button
              onClick={toggle}
              className="flex size-[44px] shrink-0 items-center justify-center rounded-full bg-white"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="3" y="2" width="4" height="14" rx="1.5" fill="#1a1a1a" />
                  <rect x="11" y="2" width="4" height="14" rx="1.5" fill="#1a1a1a" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M4 2l12 7-12 7V2z" fill="#1a1a1a" />
                </svg>
              )}
            </button>
          </div>

          {/* Divider + label */}
          <div className="px-[20px] pb-[10px] shrink-0">
            <div className="h-px bg-white/10 mb-[14px]" />
            <span className="text-white/40 text-[11px] font-bold tracking-wider uppercase">{t.channels}</span>
          </div>

          {/* Channel list — scrollable */}
          <div className="flex-1 overflow-y-auto">
            {channels.map((ch) => {
              const isActive = currentChannel?.id === ch.id
              return (
                <button
                  key={ch.id}
                  onClick={() => play(ch)}
                  className="flex w-full items-center gap-[14px] px-[20px] py-[10px]"
                  style={{ background: isActive ? 'rgba(255,255,255,0.06)' : 'transparent' }}
                >
                  <div
                    className="flex size-[40px] shrink-0 items-center justify-center rounded-full overflow-hidden"
                    style={{
                      background: `linear-gradient(${ch.gradientAngle}deg, ${ch.gradientFrom}, ${ch.gradientTo})`,
                    }}
                  >
                    {channelLogos[ch.id] && (
                      <Image src={channelLogos[ch.id]} alt={ch.name} width={40} height={40} className="size-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className={`text-[14px] font-semibold truncate ${isActive ? 'text-white' : 'text-white/80'}`}>{ch.name}</p>
                    <p className="text-white/40 text-[12px] truncate">{ch.currentArtist} – {ch.currentSong}</p>
                  </div>
                  {isActive && isPlaying && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                      <rect x="2" y="4" width="3" height="8" rx="1" fill="white" />
                      <rect x="7" y="2" width="3" height="12" rx="1" fill="white" />
                      <rect x="12" y="5" width="3" height="6" rx="1" fill="white" />
                    </svg>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Collapsed bar — always visible */}
      <div
        className="absolute left-0 right-0 z-50 bg-[#1a1a1a] cursor-pointer"
        style={{ bottom: '73px', height: '70px' }}
        onClick={!expanded ? onExpand : undefined}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Expand button — floats above top edge */}
        {!expanded && (
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-0 z-10">
            <div className="flex h-[40px] w-[56px] items-center justify-center rounded-full bg-[#1a1a1a] shadow-md">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 6l5-5 5 5" stroke="white" strokeOpacity="0.7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        )}
        {/* Player row — vertically centered */}
        <div className="flex h-full items-center gap-[12px] px-[14px]">
          <div
            className="flex size-[36px] shrink-0 items-center justify-center rounded-full overflow-hidden"
            style={{
              background: currentChannel
                ? `linear-gradient(${currentChannel.gradientAngle}deg, ${currentChannel.gradientFrom}, ${currentChannel.gradientTo})`
                : 'linear-gradient(224deg, #590907, #8d2422)',
            }}
          >
            {currentChannel && channelLogos[currentChannel.id] && (
              <Image
                src={channelLogos[currentChannel.id]}
                alt={currentChannel.name}
                width={36}
                height={36}
                className="size-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-1 min-w-0 flex-col gap-[2px]">
            <span className="text-[#9a9a9a] text-[9px] font-bold tracking-wider uppercase">
              {currentChannel?.label ?? 'Jouluradio'}
            </span>
            <p className="text-white text-[13px] font-bold leading-tight truncate">
              {artist && title ? (
                <>{artist}<span className="text-white/50"> – </span>{title}</>
              ) : (
                artist || title || '—'
              )}
            </p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); toggle() }}
            className="flex size-[40px] shrink-0 items-center justify-center rounded-full bg-white"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="2" width="4" height="12" rx="1.5" fill="#1a1a1a" />
                <rect x="10" y="2" width="4" height="12" rx="1.5" fill="#1a1a1a" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 2l10 6-10 6V2z" fill="#1a1a1a" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </>
  )
}
