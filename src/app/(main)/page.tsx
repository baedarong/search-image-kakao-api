'use client'
import { Hero } from '@/components/Hero'
import { Speakers } from '@/components/Speakers'
import { Schedule } from '@/components/Schedule'
import { Sponsors } from '@/components/Sponsors'
import { Newsletter } from '@/components/Newsletter'
import Tabs, { ITab } from '@/components/Tabs'
import { useState } from 'react'
import Favorite from '@/components/Favorite/page'
import Search from '@/components/Search/page'

export default function Home() {
  const tabData: ITab[] = [
    { name: '검색하기', current: true },
    { name: '내 보관함', current: false },
  ]

  const [tabs, setTabs] = useState<ITab[]>(tabData)

  return (
    <>
      <Tabs tabs={tabs} setTabs={setTabs} />
      <div>
        <div style={{ display: tabs[0].current ? 'block' : 'none' }}>
          <Search />
        </div>
        <div style={{ display: tabs[1].current ? 'block' : 'none' }}>
          <Favorite show={tabs[1].current} />
        </div>
      </div>
    </>
  )
}
