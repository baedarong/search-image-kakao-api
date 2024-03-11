'use client'

import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'

export type ITab = {
  name: string
  current: boolean
}

interface ITabProps {
  tabs: ITab[]
  setTabs: Dispatch<SetStateAction<ITab[]>>
}

export default function Tabs({ tabs, setTabs }: Readonly<ITabProps>) {
  const changeTabState = (selectedTab: ITab) => {
    // 새로운 탭 상태를 생성. 클릭된 탭은 'current'를 true로 설정 후 나머지 탭들은 false로 설정
    const newTabs = tabs.map((tab) => ({
      ...tab,
      current: tab.name === selectedTab.name,
    }))

    // 새로운 탭 상태로 업데이트
    setTabs(newTabs)
  }

  return (
    <div className="relative h-20">
      <div className="fixed left-0 top-0 z-10 w-full bg-white ">
        <div className="border-b border-gray-200 pt-2">
          <nav className="-mb-px flex" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                className={clsx(
                  tab.current
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'w-1/2 border-b-2 px-1 py-4 text-center text-lg font-medium',
                )}
                aria-current={tab.current ? 'page' : undefined}
                onClick={() => changeTabState(tab)}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
