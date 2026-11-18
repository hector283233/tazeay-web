import { useTranslation } from 'react-i18next'
import { useSeo } from '@/hooks/useSeo'
import { useParams } from 'react-router-dom'
import IntroCurtain from '@/components/ui/IntroCurtain'
import Marquee from '@/components/ui/Marquee'
import Hero from '@/components/sections/home/Hero'
import DepartmentsBento from '@/components/sections/home/DepartmentsBento'
import StatsBand from '@/components/sections/home/StatsBand'
import NewProducts from '@/components/sections/home/NewProducts'
import HowWeWork from '@/components/sections/home/HowWeWork'
import LatestNews from '@/components/sections/home/LatestNews'
import { departments } from '@/data/departments'
import { tr } from '@/lib/tr'

export default function Home() {
  const { lang } = useParams()
  const { t } = useTranslation()
  useSeo(t('seo.home.t'), t('seo.home.d'))
  const names = departments.map((d) => tr(d.name, lang))

  return (
    <>
      <IntroCurtain />
      <Hero />
      <div aria-hidden="true" className="marquee-wrap mt-14 overflow-hidden">
        <Marquee items={names} />
      </div>
      <main className="mx-auto max-w-[1320px] px-6">
        <DepartmentsBento />
        <StatsBand />
        <NewProducts />
        <HowWeWork />
        <LatestNews />
      </main>
    </>
  )
}