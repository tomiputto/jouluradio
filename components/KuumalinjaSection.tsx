'use client'

import { useState } from 'react'
import MessageForm from './MessageForm'
import ScrollingMessages from './ScrollingMessages'

const defaultMessages = [
  { time: 'Juuri nyt', text: 'Oikein Hyvää Joulua kaikille!' },
  { time: '2 min sitten', text: 'Vuoden paras hetki kun Jouluradio aloitti taas lähetykset :)' },
  { time: '11.28', text: 'Terveisiä Loimalta. Jouluradio on taas auki!' },
  { time: '10.09', text: 'Hyvin kuuluu autossa matkalla mökille. Hyvää Joulua studion tontuille' },
  { time: '10.02', text: 'Jouluradio soi jo kolmatta vuotta meillä kotona koko joulukuun!' },
  { time: '9.55', text: 'Terveiset Rovaniemeltä, täällä on jo lunta 😊' },
  { time: '9.48', text: 'Paras joululaulu tuli juuri. Kiitos Jouluradio!' },
  { time: '9.41', text: 'Kuuntelen töissä, koko toimisto tykkää!' },
  { time: '9.33', text: 'Terveisiä Tampereelta – joulutunnelma on täällä!' },
  { time: '9.20', text: 'Klassinen joulu -kanava on aivan ihana' },
  { time: '9.11', text: 'Hyvää joulua koko Jouluradion tiimille ❤️' },
  { time: '8.58', text: 'Kuuntelen joka aamu kahvikupin kanssa, kiitos!' },
]

export default function KuumalinjaSection() {
  const [messages, setMessages] = useState(defaultMessages)

  const handleSubmit = (text: string) => {
    const now = new Date()
    const time = now.toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' })
    setMessages((prev) => [{ time, text }, ...prev])
  }

  return (
    <>
      <MessageForm maxLength={200} onSubmit={handleSubmit} />
      <h3 className="text-[#333] text-[18px] font-extrabold pb-[12px] mt-[8px]">
        Uusimmat viestit
      </h3>
      <ScrollingMessages messages={messages} />
    </>
  )
}
