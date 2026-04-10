'use client'

import { useAudio } from '@/context/AudioContext'
import { usePlaylistSheet } from '@/context/PlaylistSheetContext'
import { type Channel } from '@/lib/channels'
import MarqueeText from './MarqueeText'

interface Props {
  channel: Channel
}

export default function ChannelCard({ channel }: Props) {
  const { currentChannel, isPlaying, nowPlaying, play, pause } = useAudio()
  const { open } = usePlaylistSheet()

  const isActive = currentChannel?.id === channel.id
  const artist = isActive && nowPlaying ? nowPlaying.artist : channel.currentArtist
  const song = isActive && nowPlaying ? nowPlaying.title : channel.currentSong

  function handleClick() {
    if (isActive && isPlaying) pause()
    else play(channel)
  }

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      className="relative h-[200px] w-[144px] shrink-0 overflow-hidden rounded-[30px] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
      style={{
        background: `linear-gradient(${channel.gradientAngle}deg, ${channel.gradientFrom}, ${channel.gradientTo})`,
      }}
    >
      {/* Channel name — top */}
      <div className="absolute left-1/2 top-[14px] -translate-x-1/2 w-full text-center px-3">
        <span className="text-white text-[13px] font-semibold leading-[1.2] line-clamp-2">
          {channel.name}
        </span>
      </div>

      {/* Play / Pause icon — center */}
      <div className="absolute left-1/2 top-[54px] -translate-x-1/2">
        {isActive && isPlaying ? (
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <circle cx="22" cy="22" r="22" fill="rgba(255,255,255,0.15)" />
            <rect x="14" y="13" width="5" height="18" rx="2" fill="white" />
            <rect x="25" y="13" width="5" height="18" rx="2" fill="white" />
          </svg>
        ) : (
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <circle cx="22" cy="22" r="22" fill="rgba(255,255,255,0.15)" />
            <path d="M18 14l14 8-14 8V14z" fill="white" />
          </svg>
        )}
      </div>

      {/* Bottom info bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[90px]">
        <div className="absolute inset-0 bg-black/40" />
        {/* Speaker icon */}
        <div className="absolute left-[8px] top-[14px] opacity-50">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
          </svg>
        </div>
        <div className="absolute left-[28px] right-[8px] top-[12px] flex flex-col gap-[2px]">
          <MarqueeText
            text={song}
            className="text-white text-[13px] font-bold leading-tight"
          />
          <MarqueeText
            text={artist}
            className="text-white/60 text-[10px] font-medium leading-tight"
          />
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); open(channel) }}
          className="absolute bottom-[16px] left-0 right-0 text-center text-white text-[12px] font-medium"
        >
          15 viimeistä
        </button>
      </div>
    </div>
  )
}
