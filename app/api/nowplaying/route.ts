import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const channel = request.nextUrl.searchParams.get('channel') || 'christmas'

  try {
    const res = await fetch(`https://api.somafm.com/songs/${channel}.json`, {
      next: { revalidate: 0 },
    })
    if (!res.ok) throw new Error('SomaFM API error')
    const data = await res.json()
    const song = data.songs?.[0]
    return NextResponse.json({
      artist: song?.artist ?? '',
      title: song?.title ?? '',
    })
  } catch {
    return NextResponse.json({ artist: '', title: '' })
  }
}
