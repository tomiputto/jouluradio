'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

const CATEGORIES = ['Yleinen palaute', 'Biisitoive', 'Uusi idea', 'Risuja', 'Ruusuja']

interface Props {
  maxLength?: number
  showCategories?: boolean
  onSubmit?: (text: string, category: string) => void
}

export default function MessageForm({ maxLength = 200, showCategories = false, onSubmit }: Props) {
  const [text, setText] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const { t } = useLanguage()

  const handleSubmit = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    onSubmit?.(trimmed, category)
    setText('')
  }

  return (
    <>
      {showCategories && <div className="scroll-x flex gap-[8px] pt-[6px] pb-[20px]">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`h-[32px] shrink-0 rounded-full px-[14px] text-[13px] font-medium transition-colors ${
              category === cat
                ? 'bg-[#8d2422] text-white'
                : 'bg-white border border-[#8d2422] text-[#8d2422]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>}
      <textarea
        className="w-full h-[91px] rounded-[4px] border border-[#8d2422] bg-white p-[16px] text-[14px] font-medium text-[#747474] resize-none focus:outline-none focus:ring-1 focus:ring-[#8d2422]"
        placeholder={t.messagePlaceholder}
        maxLength={maxLength}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex items-center justify-between pt-[16px] pb-[16px]">
        <button
          onClick={handleSubmit}
          className="flex h-[44px] items-center justify-center rounded-[4px] bg-[#8d2422] px-[16px] text-white text-[16px] font-medium"
        >
          {t.send}
        </button>
        <span className="text-[#393939] text-[12px] font-medium">
          {maxLength - text.length} {t.charsLeft}
        </span>
      </div>
    </>
  )
}
