'use client'

import { useLanguage } from '@/context/LanguageContext'

interface Props {
  title: string
  date: string
  imageUrl?: string
}

export default function NewsCard({ title, date, imageUrl }: Props) {
  const { t } = useLanguage()
  return (
    <div className="relative h-[196px] w-[160px] shrink-0 overflow-hidden rounded-[16px] bg-white shadow-[0px_4px_24px_0px_rgba(0,0,0,0.08)]">
      {/* Image */}
      <div className="h-[100px] w-full overflow-hidden bg-[#c8a5a5]">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="size-full object-cover pointer-events-none"
          />
        )}
      </div>

      {/* Date badge */}
      <div className="absolute left-[12px] top-[12px] bg-black/50 px-[4px] py-[2px]">
        <span className="text-white text-[12px] font-bold leading-tight">{date}</span>
      </div>

      {/* Text */}
      <div className="flex flex-col items-start px-[16px] pt-[12px] pb-[4px]">
        <p className="text-black text-[14px] font-medium leading-[1.4] line-clamp-2">
          {title}
        </p>
        <button className="mt-auto flex h-[40px] items-center text-[#8d2422] text-[13px] font-bold">
          {t.readMore}
        </button>
      </div>
    </div>
  )
}
