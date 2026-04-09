'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  text: string
  className?: string
}

export default function MarqueeText({ text, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    const textEl = textRef.current
    if (!container || !textEl) return

    const overflow = textEl.scrollWidth - container.clientWidth
    setOffset(overflow > 0 ? overflow : 0)
  }, [text])

  return (
    <div ref={containerRef} className={`overflow-hidden whitespace-nowrap ${className ?? ''}`}>
      <span
        ref={textRef}
        className="inline-block"
        style={
          offset > 0
            ? {
                animation: `marquee-text ${8 + offset / 15}s ease-in-out infinite`,
                ['--marquee-offset' as string]: `-${offset}px`,
              }
            : undefined
        }
      >
        {text}
      </span>
    </div>
  )
}
