'use client'

import { useState } from 'react'

interface Props {
  maxLength?: number
  onSubmit?: (text: string) => void
}

export default function MessageForm({ maxLength = 200, onSubmit }: Props) {
  const [text, setText] = useState('')

  const handleSubmit = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    onSubmit?.(trimmed)
    setText('')
  }

  return (
    <>
      <textarea
        className="w-full h-[91px] rounded-[4px] border border-[#8d2422] bg-white p-[16px] text-[14px] font-medium text-[#747474] resize-none focus:outline-none focus:ring-1 focus:ring-[#8d2422]"
        placeholder="Kirjoita viestisi"
        maxLength={maxLength}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex items-center justify-between pt-[16px] pb-[16px]">
        <button
          onClick={handleSubmit}
          className="flex h-[44px] items-center justify-center rounded-[4px] bg-[#8d2422] px-[16px] text-white text-[16px] font-medium"
        >
          Lähetä
        </button>
        <span className="text-[#393939] text-[12px] font-medium">
          {maxLength - text.length} merkkiä jäljellä
        </span>
      </div>
    </>
  )
}
