import { useSeo } from '@/hooks/useSeo'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'motion/react'
import { useDepartment, useProduct, useProducts } from '@/api/hooks'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import WordReveal from '@/components/ui/WordReveal'
import ChipGroup from '@/components/ui/ChipGroup'
import PageLoader from '@/components/ui/PageLoader'
import Reveal from '@/components/ui/Reveal'
import ProductCard from '@/components/cards/ProductCard'
import NotFound from '@/pages/NotFound'
import { mix } from '@/lib/color'
import { tr } from '@/lib/tr'
import { weight } from '@/lib/format'
import { Icon } from '@/icons'

export default function Product() {
  const { lang, deptSlug, productSlug } = useParams()
  const { data: product, isLoading } = useProduct(deptSlug, productSlug)
  const { data: dept } = useDepartment(deptSlug)
  const { data: siblings = [] } = useProducts(deptSlug)
  useSeo(product && dept ? `${tr(product.name, lang)} — ${tr(dept.name, lang)}` : null)

  if (isLoading || (product && !dept)) return <PageLoader />
  if (!product) return <NotFound />
  return <ProductView key={productSlug} product={product} dept={dept} siblings={siblings} />
}

function ProductView({ product, dept, siblings }) {
  const { t } = useTranslation()
  const { lang } = useParams()
  const base = `/${lang}`
  const [photo, setPhoto] = useState(0)
  const [pack, setPack] = useState(product.weights[0])

  const photos = [0, 0.06, 0.12, 0.18].map((k) => mix(dept.soft, dept.tint, k))
  const category = dept.categories.find((c) => c.key === product.cat)
  const related = siblings.filter((p) => p.slug !== product.slug).slice(0, 4)
  const specs = [
    ['shelf', t('product.tbd')],
    ['storage', t('product.tbd')],
    ['ingredients', t('product.tbd')],
    ['maker', t('product.makerValue')],
  ]

  return (
    <main className="mx-auto max-w-[1320px] px-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-10">
        <Breadcrumbs items={[
          { label: t('nav.home'), to: base },
          { label: t('nav.departments'), to: `${base}/departments` },
          { label: tr(dept.name, lang), to: `${base}/departments/${dept.slug}` },
          { label: tr(product.name, lang) },
        ]} />
      </motion.div>

      <section className="mt-7 flex flex-wrap items-start gap-12">
        {/* gallery */}
        <div className="flex flex-[1.15_1_480px] flex-col gap-3">
          <div className="relative aspect-[1/0.92] overflow-hidden rounded-[40px]">
            <AnimatePresence mode="wait">
              <motion.div key={photo} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                className="absolute inset-0 flex items-center justify-center" style={{ background: photos[photo] }}>
                <span aria-hidden="true" className="absolute aspect-square w-3/5 rounded-full bg-white/55" />
                <Icon name={dept.icon} strokeWidth={0.55} className="animate-floaty relative size-[230px]" style={{ color: dept.tint }} />
              </motion.div>
            </AnimatePresence>
            <span className="absolute left-5 top-5 flex gap-2">
              <span className="rounded-full bg-[#C8F169] px-3.5 py-1.5 text-[13px] font-semibold text-[#0D1B13]">
                {product.isNew ? t('product.new') : t('product.halal')}
              </span>
              {category && <span className="rounded-full bg-white px-3.5 py-1.5 text-[13px] font-medium text-[#0D1B13]">{tr(category.name, lang)}</span>}
            </span>
            <span className="absolute bottom-5 right-5 rounded-full bg-white/85 px-3.5 py-1.5 text-[13px] text-[#0D1B13] backdrop-blur">
              {t('product.photo', { n: photo + 1, total: photos.length })}
            </span>
          </div>
          <div role="group" aria-label={t('product.photos')} className="grid grid-cols-4 gap-3">
            {photos.map((bg, i) => (
              <button key={i} type="button" onClick={() => setPhoto(i)} aria-pressed={i === photo}
                aria-label={t('product.showPhoto', { n: i + 1 })}
                className={`aspect-square rounded-[22px] border-2 transition duration-300 hover:-translate-y-0.5 ${i === photo ? 'border-ink' : 'border-transparent'}`}
                style={{ background: bg }} />
            ))}
          </div>
        </div>

        {/* info */}
        <div className="flex flex-[1_1_400px] flex-col gap-7 lg:sticky lg:top-28">
          <div>
            <Link to={`${base}/departments/${dept.slug}`}
              className="inline-flex items-center gap-2 rounded-full py-1.5 pl-2.5 pr-3.5 text-sm text-[#0D1B13]"
              style={{ background: dept.soft }}>
              <span className="size-2 rounded-full" style={{ background: dept.tint }} />
              {tr(dept.name, lang)}{category ? ` · ${tr(category.name, lang)}` : ''}
            </Link>
            <h1 className="mt-4 font-display text-[clamp(40px,5vw,60px)] font-medium leading-none tracking-[-0.05em]">
              <WordReveal text={tr(product.name, lang)} delay={0.15} />
            </h1>
          </div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-[17px] leading-relaxed text-muted">{t('product.desc')}</motion.p>

          {product.weights.length > 1 && (
            <div>
              <h2 className="mb-3 text-sm font-semibold">{t('product.pack')}</h2>
              <ChipGroup label={t('product.pack')} value={pack} onChange={setPack}
                options={product.weights.map((w) => ({ value: w, label: weight(w, t) }))} />
            </div>
          )}

          <dl className="rounded-[28px] bg-surface px-5 py-1.5">
            {product.weights.length === 1 && (
              <div className="flex justify-between gap-4 border-b border-line py-4 text-[15px]">
                <dt className="text-muted">{t('product.pack')}</dt><dd className="font-medium">{weight(product.weights[0], t)}</dd>
              </div>
            )}
            {specs.map(([k, v], i) => (
              <div key={k} className={`flex justify-between gap-4 py-4 text-[15px] ${i < specs.length - 1 ? 'border-b border-line' : ''}`}>
                <dt className="text-muted">{t(`product.specs.${k}`)}</dt><dd className="text-right font-medium">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-wrap gap-2.5">
            <Link to={`${base}/contacts`}
              className="btn-shine inline-flex h-[58px] items-center gap-3 rounded-full bg-ink pl-[26px] pr-2.5 text-base font-medium text-bg">
              {t('product.ask')}
              <span className="flex size-10 items-center justify-center rounded-full bg-[#C8F169] text-[#0D1B13]">
                <Icon name="arrow" className="size-[17px]" strokeWidth={2} />
              </span>
            </Link>
            {dept.phone && (
              <a href={`tel:${dept.phone.replace(/\s/g, '')}`}
                className="btn-shine inline-flex h-[58px] items-center gap-2.5 rounded-full border border-line bg-surface px-6 text-base font-medium">
                {dept.phone}
              </a>
            )}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <Reveal as="section" aria-labelledby="h-rel" className="mt-32">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 id="h-rel" className="font-display text-[clamp(30px,3.6vw,44px)] font-medium tracking-[-0.045em]">{t('product.related')}</h2>
            <Link to={`${base}/departments/${dept.slug}`} className="group inline-flex min-h-11 items-center gap-2 text-[15px] font-medium">
              {t('product.allDept')}
              <Icon name="arrow" className="size-[18px] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.8} />
            </Link>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5">
            {related.map((p) => <ProductCard key={p.slug} product={p} dept={dept} />)}
          </div>
        </Reveal>
      )}
    </main>
  )
}