import { NextRequest, NextResponse } from 'next/server'

function formatTime(unixSeconds: number): string {
  const d = new Date(unixSeconds * 1000)
  return d.toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Helsinki' })
}

export async function GET(request: NextRequest) {
  const channel = request.nextUrl.searchParams.get('channel') || 'christmas'

  try {
    const res = await fetch(`https://api.somafm.com/songs/${channel}.json`, {
      next: { revalidate: 0 },
    })
    if (!res.ok) throw new Error('SomaFM API error')
    const data = await res.json()
    const now = Math.floor(Date.now() / 1000)
    const songs = (data.songs ?? []).slice(0, 15).map((s: Record<string, string>, i: number) => {
      const rawTime = parseInt(s.startTime ?? '0', 10)
      const time = rawTime > 0 ? formatTime(rawTime) : formatTime(now - i * 210)
      return { artist: s.artist ?? '', title: s.title ?? '', time }
    })
    return NextResponse.json({ songs })
  } catch {
    return NextResponse.json({ songs: [] })
  }
}
