import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { password } = await request.json()

  if (password !== process.env.JOULURADIO_PASSWORD) {
    return NextResponse.json({ error: 'Väärä salasana' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set('jouluradio-auth', 'authenticated', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })
  return response
}
