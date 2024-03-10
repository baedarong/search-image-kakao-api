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
      {tabs[0].current === true && <Search />}
      {tabs[1].current === true && <Favorite />}
    </>
  )
}
