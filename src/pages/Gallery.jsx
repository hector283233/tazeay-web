import { useSeo } from '@/hooks/useSeo'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'motion/react'
import { useGallery } from '@/api/hooks'
import PageIntro from '@/components/ui/PageIntro'
import ChipGroup from '@/components/ui/ChipGroup'
import Lightbox from '@/components/ui/Lightbox'
import PageLoader from '@/components/ui/PageLoader'
import { departments } from '@/data/departments'
import { tr } from '@/lib/tr'
import { Icon } from '@/icons'

const deptOf = (slug) => departments.find((d) => d.slug === slug)

export default function Gallery() {
  const { t } = useTranslation()
  const { lang } = useParams()
  const { data = [], isLoading } = useGallery()
  const [filter, setFilter] = useState('all')
  const [open, setOpen] = useState(null)
  useSeo(t('seo.gallery.t'), t('seo.gallery.d'))

  const cats = [...new Set(data.map((g) => g.cat))]
  const options = [{ value: 'all', label: t('gallery.all') }, ...cats.map((c) => ({ value: c, label: tr(deptOf(c)?.name, lang) }))]
  const items = filter === 'all' ? data : data.filter((g) => g.cat === filter)
  const caption = (g) => tr(deptOf(g.cat)?.name, lang)

  const visual = (g, big = false) => {
    const d = deptOf(g.cat)
    return (
      <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center" style={{ background: d?.soft }}>
        <Icon name={d?.icon} strokeWidth={big ? 0.6 : 0.9} className={big ? 'size-40' : 'size-[72px]'} style={{ color: d?.tint, opacity: 0.6 }} />
      </span>
    )
  }

  return (
    <main className="mx-auto max-w-[1320px] px-6">
      <PageIntro eyebrow={t('gallery.eyebrow')} title={t('gallery.title')}>
        <ChipGroup label={t('gallery.filter')} options={options} value={filter} onChange={(v) => { setFilter(v); setOpen(null) }} />
      </PageIntro>

      {isLoading ? <PageLoader /> : (
        <motion.section layout aria-label={t('gallery.title')}
          className="mt-12 grid grid-flow-dense auto-rows-[250px] grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3.5">
          <AnimatePresence mode="popLayout">
            {items.map((g, i) => (
              <motion.button key={g.id} layout type="button" onClick={() => setOpen(i)}
                aria-label={t('gallery.open', { name: caption(g) })}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
                className={`group relative cursor-zoom-in overflow-hidden rounded-[30px] text-left
                  ${g.rows === 2 ? 'row-span-2' : ''} ${g.cols === 2 ? 'sm:col-span-2' : ''}`}>
                <span className="absolute inset-0 transition-transform duration-700 ease-brand group-hover:scale-108">{visual(g)}</span>
                <span className="absolute bottom-3.5 left-3.5 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[13px] font-medium text-[#0D1B13] transition duration-300 group-hover:-translate-y-1 group-hover:bg-[#C8F169]">
                  {caption(g)} <Icon name="search" className="size-3.5" strokeWidth={2} />
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.section>
      )}

      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen}
        renderItem={(g) => visual(g, true)} caption={caption} />
    </main>
  )
}