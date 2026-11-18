import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'motion/react'
import ChipGroup from '@/components/ui/ChipGroup'
import ProductCard from '@/components/cards/ProductCard'
import { tr } from '@/lib/tr'

export default function DeptCatalog({ dept, products, cat, onCat }) {
  const { t } = useTranslation()
  const { lang } = useParams()
  const [sort, setSort] = useState('default')

  const options = [
    { value: 'all', label: t('dept.all') },
    ...dept.categories.map((c) => ({ value: c.key, label: tr(c.name, lang) })),
  ]
  let list = cat === 'all' ? products : products.filter((p) => p.cat === cat)
  if (sort === 'name') list = [...list].sort((a, b) => tr(a.name, lang).localeCompare(tr(b.name, lang), lang))

  return (
    <section id="catalog" aria-labelledby="h-cat" className="mt-32 scroll-mt-28">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
        <h2 id="h-cat" className="font-display text-[clamp(36px,4.5vw,56px)] font-medium leading-none tracking-[-0.045em]">
          {t('dept.catalog')}
        </h2>
        <span className="text-[15px] text-muted">{t('dept.items', { count: list.length })}</span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <ChipGroup label={t('dept.catalog')} options={options} value={cat} onChange={onCat} />
        <label className="flex items-center gap-3 text-sm text-muted">
          {t('dept.sort')}
          <select value={sort} onChange={(e) => setSort(e.target.value)}
            className="h-11 rounded-full border border-line bg-surface px-4 text-sm text-ink">
            <option value="default">{t('dept.sortDefault')}</option>
            <option value="name">{t('dept.sortName')}</option>
          </select>
        </label>
      </div>

      {list.length === 0 ? (
        <p className="mt-12 rounded-[28px] bg-surface p-10 text-center text-muted">{t('dept.empty')}</p>
      ) : (
        <motion.div layout className="mt-9 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-x-5 gap-y-10">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.div key={p.slug} layout
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.04, ease: [0.2, 0.8, 0.2, 1] }}>
                <ProductCard product={p} dept={dept} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  )
}