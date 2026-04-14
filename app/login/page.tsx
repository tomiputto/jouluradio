'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push('/')
        router.refresh()
      } else {
        setError('Väärä salasana. Yritä uudelleen.')
        setPassword('')
      }
    } catch {
      setError('Jotain meni pieleen. Yritä uudelleen.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <div
        className="w-full max-w-[407px] rounded-2xl bg-white p-11"
        style={{ boxShadow: '0px 0px 44px 0px rgba(0,0,0,0.25)' }}
      >
        {/* Title */}
        <h1 className="mb-11 text-2xl font-medium text-black">
          Salasana vaaditaan
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Label */}
          <label className="text-sm font-medium text-black">
            Anna salasana
          </label>

          {/* Input */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Kirjoita salasana"
            autoFocus
            required
            className="h-11 w-full rounded-[4px] border-2 border-zinc-400 px-4 text-base text-black placeholder:text-zinc-400 outline-none focus:border-zinc-600"
          />

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading || !password}
            className="mt-4 flex w-fit items-center gap-2 rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-50"
          >
            {loading ? 'Tarkistetaan...' : 'Jatka'}
            {!loading && (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
