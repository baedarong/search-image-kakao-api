import { Hero } from '@/components/Hero'
import { Newsletter } from '@/components/Newsletter'
import { Schedule } from '@/components/Schedule'
import { Speakers } from '@/components/Speakers'
import { Sponsors } from '@/components/Sponsors'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Keynote - darong.bae',
  description: 'Conference template made by Next14, React18, TailwindCSS',
}

export default function Home() {
  return (
    <>
      <Hero />
      <Speakers />
      <Schedule />
      <Sponsors />
      <Newsletter />
    </>
  )
}
