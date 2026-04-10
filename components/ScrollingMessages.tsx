'use client'

interface Message {
  time: string
  text: string
}

export default function ScrollingMessages({ messages }: { messages: Message[] }) {
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
