import { useSeo } from '@/hooks/useSeo'
import { useParams, useSearchParams } from 'react-router-dom'
import { useDepartment, useProducts } from '@/api/hooks'
import Header from '@/components/layout/Header'
import PageLoader from '@/components/ui/PageLoader'
import Marquee from '@/components/ui/Marquee'
import DeptHero from '@/components/sections/department/DeptHero'
import DeptHits from '@/components/sections/department/DeptHits'
import DeptCatalog from '@/components/sections/department/DeptCatalog'
import DeptAbout from '@/components/sections/department/DeptAbout'
import OtherDepartments from '@/components/sections/department/OtherDepartments'
import NotFound from '@/pages/NotFound'
import { tr } from '@/lib/tr'

export default function Department() {
  const { lang, deptSlug } = useParams()
  const { data: dept, isLoading } = useDepartment(deptSlug)
  const { data: products = [] } = useProducts(deptSlug)
  const [params, setParams] = useSearchParams()
  const cat = params.get('cat') || 'all'
  useSeo(dept ? tr(dept.name, lang) : null, dept ? tr(dept.tagline, lang) : null)

  const setCat = (c) => setParams(c === 'all' ? {} : { cat: c }, { replace: true, preventScrollReset: true })
  const pickFromHero = (c) => {
    setCat(c)
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })
  }

  if (isLoading) return <><Header /><PageLoader /></>
  if (!dept) return <><Header /><NotFound /></>

  const catNames = dept.categories.map((c) => tr(c.name, lang))
  const marqueeItems = [...catNames, ...catNames, ...catNames]
  const hits = products.filter((p) => p.hit || p.isNew).slice(0, 3)

  return (
    <div style={{ '--dept-tint': dept.tint, '--dept-soft': dept.soft }}>
      <DeptHero dept={dept} products={products} onPick={pickFromHero} />
      <div aria-hidden="true" className="marquee-wrap mt-14 overflow-hidden">
        <Marquee items={marqueeItems} />
      </div>
      <main className="mx-auto max-w-[1320px] px-6">
        <DeptHits dept={dept} products={hits} />
        <DeptCatalog dept={dept} products={products} cat={cat} onCat={setCat} />
        <DeptAbout dept={dept} />
        <OtherDepartments current={dept.slug} />
      </main>
    </div>
  )
}