'use client'

import AudioPlayer from './AudioPlayer'
import PlaylistSheet from './PlaylistSheet'
import { useState, useRef } from 'react'

const PLAYER_FULL_HEIGHT = 707
const PLAYER_COLLAPSED_HEIGHT = 70
const PLAYER_TRANSLATE_Y = PLAYER_FULL_HEIGHT - PLAYER_COLLAPSED_HEIGHT // 637

function StatusBar() {
  return (
    <div className="bg-white pt-[14px] pb-[12px] shrink-0 w-full">
      {/* Inner statusbar — h-[36px], all elements absolutely positioned inside */}
      <div className="relative h-[36px] w-full">
        {/* Dynamic Island — centered */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-[18px] w-[124px] h-[36px]" />
        {/* Time — left side, vertically centered */}
        <p className="absolute left-[77px] -translate-x-1/2 top-1/2 -translate-y-1/2 text-[17px] font-bold text-black text-center tracking-[-0.4px] w-[122px] leading-none">
          15.19
        </p>
        {/* Icons — right side, vertically centered */}
        <div className="absolute right-[35px] top-1/2 -translate-y-1/2 flex items-center gap-[7px]">
          <img src="/safari-cellular.svg" alt="" style={{ width: '19.33px', height: '12.33px' }} />
          <img src="/safari-wifi.svg" alt="" style={{ width: '17px', height: '12.33px' }} />
          <img src="/safari-battery.svg" alt="" style={{ width: '27.33px', height: '13.67px' }} />
        </div>
      </div>
    </div>
  )
}

function BrowserBar() {
  return (
    <div className="bg-white px-[16px] pb-[10px] shrink-0">
      {/* Address bar — Figma: backdrop-blur, rounded-[24px], 44px tall */}
      <div className="relative flex items-center h-[44px] rounded-[24px] bg-[rgba(250,250,250,0.7)] backdrop-blur-[12px] border border-white shadow-[0px_2px_40px_0px_rgba(0,0,0,0.1)]">
        <div className="absolute left-[15px]">
          <img src="/safari-site-settings.svg" alt="" width={15} height={18} />
        </div>
        <span className="flex-1 text-center text-[17px] font-medium text-[#1b1b1b]">jouluradio.fi</span>
        <div className="absolute right-[13px]">
          <img src="/safari-reload.svg" alt="" width={15} height={18} />
        </div>
      </div>
    </div>
  )
}

function BrowserNavBar() {
  return (
    <div className="bg-white shrink-0 flex flex-col items-center pt-[12px] pb-[8px]">
      {/* Frosted glass pill — matches Figma "Tabs Mode Bottom Bar" */}
      <div className="flex items-center justify-center h-[48px] w-[346px] rounded-[24px] bg-[rgba(250,250,250,0.6)] backdrop-blur-[3px] border border-white shadow-[0px_2px_40px_0px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-[46px]">
          <button className="flex w-[24px] justify-center"><img src="/􀯶.svg" alt="back" height={27} /></button>
          <button className="flex w-[24px] justify-center opacity-30"><img src="/􀯻.svg" alt="forward" height={27} /></button>
          <button className="flex w-[24px] justify-center"><img src="/􀈂.svg" alt="share" height={27} /></button>
          <button className="flex w-[24px] justify-center"><img src="/􀉚.svg" alt="bookmarks" height={27} /></button>
          <button className="flex w-[24px] justify-center"><img src="/􀐅.svg" alt="tabs" height={27} /></button>
        </div>
      </div>
      {/* Home indicator */}
      <div className="mt-[6px] h-[5px] w-[134px] rounded-full bg-black/80"/>
    </div>
  )
}

export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false)
  const touchStartY = useRef(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaY = touchStartY.current - e.changedTouches[0].clientY
    if (!expanded && deltaY > 40) setExpanded(true)
    if (expanded && deltaY < -40) setExpanded(false)
  }

  return (
    <div className="flex min-h-screen items-start justify-center bg-[#e5e5ea] py-[40px]">
      <div className="rounded-[60px] p-[10px] shadow-[0_24px_90px_rgba(0,0,0,0.45)]"
        style={{
          background: 'linear-gradient(160deg, #5a5a5a 0%, #1c1c1e 25%, #0a0a0a 55%, #2c2c2e 100%)',
          boxShadow: '0 24px 90px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.12)',
        }}>
        <div className="relative flex w-[402px] flex-col overflow-hidden rounded-[56px]" style={{ height: '844px' }}>
          <StatusBar />
          <BrowserBar />

          {/* Scrollable page content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {children}
            {/* Spacer so content isn't hidden behind collapsed player */}
            <div style={{ height: `${PLAYER_COLLAPSED_HEIGHT}px` }} />
          </div>

          <AudioPlayer
            expanded={expanded}
            onExpand={() => setExpanded(true)}
            onCollapse={() => setExpanded(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          />

          <PlaylistSheet />
          <BrowserNavBar />
        </div>
      </div>
    </div>
  )
}
