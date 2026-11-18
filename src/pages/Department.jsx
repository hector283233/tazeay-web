import { useParams } from 'react-router-dom'
import Header from '@/components/layout/Header'
import { departments } from '@/data/departments'
import { tr } from '@/lib/tr'

export default function Department() {
  const { lang, deptSlug } = useParams()
  const d = departments.find((x) => x.slug === deptSlug)
  return (
    <div className="p-3.5">
      <section className="relative min-h-[520px] overflow-hidden rounded-[40px]" style={{ background: d?.tint ?? '#24566F' }}>
        <Header variant="hero" />
        <h1 className="mt-20 text-center font-display text-6xl font-medium text-white">{d ? tr(d.name, lang) : '404'}</h1>
      </section>
    </div>
  )
}