'use client'

import { useState, useEffect } from 'react'
import MessageForm from './MessageForm'
import ScrollingMessages from './ScrollingMessages'
import { useLanguage } from '@/context/LanguageContext'

export default function KuumalinjaSection() {
  const { t } = useLanguage()
  const [messages, setMessages] = useState(t.messages)

  useEffect(() => {
    setMessages(t.messages)
  }, [t])

  const handleSubmit = (text: string) => {
    const now = new Date()
    const time = now.toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' })
    setMessages((prev: { time: string; text: string }[]) => [{ time, text }, ...prev])
  }

  return (
    <>
      <MessageForm maxLength={200} onSubmit={handleSubmit} />
      <h3 className="text-[#333] text-[18px] font-extrabold pb-[12px] mt-[8px]">
        {t.latestMessages}
      </h3>
      <ScrollingMessages messages={messages} />
    </>
  )
}
