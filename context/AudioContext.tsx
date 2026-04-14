'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { channels, type Channel } from '@/lib/channels'

interface NowPlaying {
  artist: string
  title: string
}

interface AudioContextValue {
  currentChannel: Channel | null
  isPlaying: boolean
  nowPlaying: NowPlaying | null
  volume: number
  play: (channel: Channel) => void
  pause: () => void
  toggle: () => void
  setVolume: (v: number) => void
}

const AudioContext = createContext<AudioContextValue | null>(null)

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(channels[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null)
  const [volume, setVolumeState] = useState(1)

  useEffect(() => {
    const audio = new Audio()
    audio.addEventListener('play', () => setIsPlaying(true))
    audio.addEventListener('pause', () => setIsPlaying(false))
    audio.addEventListener('error', () => setIsPlaying(false))
    audioRef.current = audio
    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  const fetchNowPlaying = useCallback(async (channel: Channel) => {
    try {
      const res = await fetch(
        `/api/nowplaying?channel=${channel.metadataChannel}`,
        { cache: 'no-store' }
      )
      if (res.ok) {
        const data = await res.json()
        if (data.artist || data.title) setNowPlaying(data)
      }
    } catch {
      // silently ignore - stream metadata is optional
    }
  }, [])

  useEffect(() => {
    if (!currentChannel || !isPlaying) return
    fetchNowPlaying(currentChannel)
    const interval = setInterval(() => fetchNowPlaying(currentChannel), 30_000)
    return () => clearInterval(interval)
  }, [currentChannel, isPlaying, fetchNowPlaying])

  const play = useCallback(
    (channel: Channel) => {
      const audio = audioRef.current
      if (!audio) return
      if (currentChannel?.id !== channel.id || !audio.src) {
        audio.src = channel.streamUrl
        setCurrentChannel(channel)
        setNowPlaying(null)
      }
      audio.play().catch(console.error)
    },
    [currentChannel]
  )

  const setVolume = useCallback((v: number) => {
    setVolumeState(v)
    if (audioRef.current) audioRef.current.volume = v
  }, [])

  const pause = useCallback(() => {
    audioRef.current?.pause()
  }, [])

  const toggle = useCallback(() => {
    if (isPlaying) pause()
    else if (currentChannel) play(currentChannel)
  }, [isPlaying, currentChannel, play, pause])

  return (
    <AudioContext.Provider
      value={{ currentChannel, isPlaying, nowPlaying, volume, play, pause, toggle, setVolume }}
    >
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const ctx = useContext(AudioContext)
  if (!ctx) throw new Error('useAudio must be used within AudioProvider')
  return ctx
}
