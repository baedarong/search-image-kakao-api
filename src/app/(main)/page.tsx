import { Hero } from '@/components/Hero'
import { Speakers } from '@/components/Speakers'
import { Schedule } from '@/components/Schedule'
import { Sponsors } from '@/components/Sponsors'
import { Newsletter } from '@/components/Newsletter'

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
