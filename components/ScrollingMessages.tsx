'use client'

const messages = [
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

export default function ScrollingMessages() {
  const doubled = [...messages, ...messages]

  return (
    <div className="overflow-hidden" style={{ height: '220px' }}>
      <div className="animate-scroll-up">
        {doubled.map((msg, i) => (
          <div key={i}>
            <div className="py-[12px]">
              <p className="text-[#919191] text-[12px] font-medium mb-[2px]">{msg.time}</p>
              <p className="text-black text-[14px] font-medium">{msg.text}</p>
            </div>
            {i < doubled.length - 1 && <div className="h-px w-full bg-[#e0e0e0]" />}
          </div>
        ))}
      </div>
    </div>
  )
}
