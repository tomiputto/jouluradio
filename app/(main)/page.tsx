'use client'

import Image from 'next/image'
import Header from '@/components/Header'
import ChannelCard from '@/components/ChannelCard'
import NewsCard from '@/components/NewsCard'
import MessageForm from '@/components/MessageForm'
import KuumalinjaSection from '@/components/KuumalinjaSection'
import { channels } from '@/lib/channels'
import { useLanguage } from '@/context/LanguageContext'


export default function Home() {
  const { t } = useLanguage()

  return (
    <div className="flex min-h-full justify-center bg-white">
      <div className="flex w-full flex-col bg-white">
        <Header />

        {/* Hero banner */}
        <div className="relative w-full">
          <Image
            src="/banner.png"
            alt="Jouluradio banneri"
            width={1206}
            height={558}
            className="w-full object-cover"
            priority
          />
        </div>

        {/* Kuuntele */}
        <section className="pt-[24px] pb-[32px]">
          <div className="flex items-center justify-between px-[20px] pb-[19px]">
            <h2 className="text-[#333] text-[23px] font-extrabold">{t.listen}</h2>
            <button className="text-[#8d2422] text-[14px] font-bold">
              {t.exploreChannels}
            </button>
          </div>
          <div className="scroll-x flex gap-[14px] px-[20px]">
            {channels.map((ch) => (
              <ChannelCard key={ch.id} channel={ch} />
            ))}
          </div>
        </section>

        {/* Ajankohtaista */}
        <section
          className="relative pt-[32px] pb-[32px]"
          style={{ background: '#f1f1f1' }}
        >
          <div className="flex items-center justify-between px-[20px] pb-[19px]">
            <h2 className="text-[#333] text-[23px] font-extrabold">{t.news}</h2>
            <button className="text-[#8d2422] text-[14px] font-bold">{t.readAll}</button>
          </div>
          <div className="scroll-x flex gap-[16px] px-[20px]">
            {t.newsItems.map((item: { title: string; date: string; imageUrl: string }) => (
              <NewsCard key={item.imageUrl} title={item.title} date={item.date} imageUrl={item.imageUrl} />
            ))}
          </div>
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-[80px]"
            style={{ background: 'linear-gradient(to bottom, transparent, white)' }}
          />
        </section>

        {/* Tietoa Jouluradiosta */}
        <section className="px-[20px] pt-[16px]" style={{ background: 'white' }}>
          <h2 className="text-[#333] text-[23px] font-extrabold pb-[16px]">
            {t.aboutTitle}
          </h2>
          <div className="rounded-[16px] bg-[#220404] px-[24px] py-[8px]">
            {[t.mhzFrequencies, t.partners, t.faq].map((item, i, arr) => (
              <div key={item}>
                <div className="flex items-center justify-between py-[18px]">
                  <span className="text-white text-[14px] font-medium">{item}</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {i < arr.length - 1 && <div className="h-px w-full bg-white/10" />}
              </div>
            ))}
          </div>
        </section>

        {/* Kuumalinja */}
        <section className="mt-[32px] bg-[#f1f1f1] px-[20px] py-[24px] rounded-[16px] mx-[0]">
          <h2 className="text-[#333] text-[23px] font-extrabold pb-[8px]">{t.hotline}</h2>
          <p className="text-[#333] text-[14px] font-medium pb-[12px]">{t.hotlineDesc}</p>
          <KuumalinjaSection />
        </section>

        {/* Lähetä meille musiikkia */}
        <section className="px-[20px] pt-[48px]">
          <div className="rounded-[16px] bg-[#8d2422] px-[24px] pt-[28px] pb-[16px] flex flex-col gap-[16px]">
            <h2 className="text-white text-[23px] font-extrabold">{t.sendMusic}</h2>
            <p className="text-white text-[14px] font-medium">{t.sendMusicDesc}</p>
            <button className="self-start flex h-[44px] items-center justify-center rounded-[4px] border border-white px-[16px] text-white text-[16px] font-medium mb-[16px]">
              {t.readMore}
            </button>
          </div>
        </section>

        {/* Lähetä palautetta */}
        <section className="px-[20px] pt-[40px]">
          <h2 className="text-[#333] text-[23px] font-extrabold pb-[8px]">{t.sendFeedback}</h2>
          <p className="text-[#333] text-[14px] font-medium pb-[12px]">{t.sendFeedbackDesc}</p>
          <MessageForm maxLength={200} showCategories />
        </section>

        {/* Mikä on Jouluradio */}
        <section className="mt-[32px] bg-[#f1f1f1] rounded-tl-[16px] rounded-tr-[16px] px-[20px] pt-[24px] pb-[16px]">
          <h2 className="text-[#333] text-[23px] font-extrabold pb-[16px]">{t.whatIsTitle}</h2>
          <p className="text-black text-[14px] font-medium leading-[1.5] pb-[12px]">{t.whatIsText1}</p>
          <p className="text-black text-[14px] font-medium leading-[1.5] pb-[24px]">{t.whatIsText2}</p>
          <h3 className="text-[#333] text-[18px] font-extrabold pb-[12px] mt-[24px]">{t.moreInfo}</h3>
          <div className="flex flex-wrap pb-[32px]">
            {[t.contact, t.forMedia, t.bugReport, t.advertising].map((link) => (
              <button key={link} className="flex h-[28px] items-center pr-[12px] text-[#8d2422] text-[14px] font-medium">
                {link}
              </button>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#8D2422] flex flex-col items-center pt-[24px] pb-[24px] gap-[16px]">
          <Image src="/Logo-white.svg" alt="Jouluradio" width={80} height={32} />
          <div className="flex items-center">
            <a href="#" aria-label="Instagram" className="flex size-[44px] items-center justify-center text-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className="flex size-[44px] items-center justify-center text-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
          <p className="text-white text-[11px] font-medium text-center">{t.copyright}</p>
        </footer>
      </div>
    </div>
  )
}
