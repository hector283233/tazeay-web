import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import WordReveal from '@/components/ui/WordReveal'
import Reveal from '@/components/ui/Reveal'
import Counter from '@/components/ui/Counter'
import Photo from '@/components/ui/Photo'
import DeptChip from '@/components/product/DeptChip'
import PackPicker from '@/components/product/PackPicker'
import ProductActions from '@/components/product/ProductActions'
import Characteristics from '@/components/product/Characteristics'
import ProductBreadcrumbs from '@/components/product/ProductBreadcrumbs'
import RelatedProducts from '@/components/product/RelatedProducts'
import { productPhotos } from '@/lib/productPhotos'
import { findGroup, formatValue } from '@/lib/attributes'
import { tr } from '@/lib/tr'
import { Icon } from '@/icons'

// the hero stays light in dark mode too, so its text keeps the light colours
const LIGHT = { '--ink': '#0D1B13', '--muted': '#59645C', '--surface': '#FFFFFF', '--line': '#DEE0D8', '--bg': '#F4F4EF' }

const STORAGE_ICONS = { temp: 'snow', shelf: 'calendar', pack: 'box', kind: 'check' }

function Step({ n, label, light = false }) {
  return (
    <p className={`mb-5 text-[13px] font-semibold uppercase tracking-[0.1em] ${light ? 'text-white/60' : 'text-muted'}`}>
      <span className={light ? 'text-[#C8F169]' : 'text-dept'}>{n}</span> — {label}
    </p>
  )
}

// whole numbers count up when they scroll into view; decimals are shown as they are
function BigNumber({ item, lang }) {
  if (Number.isInteger(item.value)) return <Counter to={item.value} />
  return typeof item.value === 'number' ? item.value.toLocaleString(lang === 'en' ? 'en-US' : 'ru-RU') : formatValue(item, lang)
}

// Design 3 — full-screen hero and numbered sections, for new and flagship products
export default function StoryLayout({ product, dept, related }) {
  const { t } = useTranslation()
  const { lang } = useParams()
  const [pack, setPack] = useState(product.weights[0])
  const photo = productPhotos(product, dept)[0]
  const name = tr(product.name, lang)
  const nutrition = findGroup(product.attributes, 'nutrition')
  const storage = findGroup(product.attributes, 'storage')
  const steps = ['about', nutrition && 'nutrition', storage && 'storage', 'ingredients'].filter(Boolean)
  const num = (key) => String(steps.indexOf(key) + 1).padStart(2, '0')

  return (
    <main style={{ '--dept-tint': dept.tint, '--dept-soft': dept.soft }}>
      <section className="relative overflow-hidden rounded-b-[56px] px-6 pb-20 pt-10" style={{ background: dept.soft, ...LIGHT }}>
        <div aria-hidden="true" className="animate-floaty absolute -right-32 top-16 aspect-square w-[520px] rounded-full bg-white/50" />
        <div aria-hidden="true" className="absolute -bottom-40 -left-40 aspect-square w-[420px] rounded-full bg-white/35" />
        <div className="relative mx-auto max-w-[1320px]">
          <ProductBreadcrumbs product={product} dept={dept} />
          <div className="mt-14 flex flex-col items-center text-center">
            <DeptChip dept={dept} product={product} className="!bg-white" />
            <h1 className="mt-6 font-display text-[clamp(52px,9vw,112px)] font-medium leading-[0.95] tracking-[-0.055em] text-[#0D1B13]">
              <WordReveal text={name} delay={0.2} />
            </h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="mt-6 max-w-[560px] text-[19px] leading-relaxed text-[#59645C]">{t('product.short')}</motion.p>
            <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 160, damping: 16 }}
              className="relative mt-8 size-[min(320px,70vw)]">
              <div className="relative size-full overflow-hidden rounded-full bg-white shadow-[0_30px_80px_rgba(13,27,19,0.15)]">
                <Photo id={photo.id} position={photo.pos} w={700} eager alt={name}>
                  <span className="absolute inset-0 flex items-center justify-center">
                    <Icon name={dept.icon} strokeWidth={0.5} className="size-2/3" style={{ color: dept.tint }} />
                  </span>
                </Photo>
              </div>
              <span aria-hidden="true"
                className="animate-spin-slow absolute -right-3 -top-3 flex size-[92px] items-center justify-center rounded-full bg-[#C8F169] text-xs font-semibold tracking-[0.1em] text-[#0D1B13]">
                {product.isNew ? t('product.new').toUpperCase() : t('product.halal').toUpperCase()}
              </span>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3.5 text-[#0D1B13]">
              <PackPicker product={product} value={pack} onChange={setPack} showTitle={false} />
              <ProductActions dept={dept} />
            </motion.div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1320px] px-6">
        <Reveal as="section" className="mt-28 flex flex-wrap gap-12">
          <div className="flex-[0_0_280px]"><Step n={num('about')} label={t('product.about')} /></div>
          <p className="flex-[1_1_600px] font-display text-[clamp(26px,3vw,38px)] font-medium leading-snug tracking-[-0.03em]">
            {t('product.desc')}
          </p>
        </Reveal>
      </div>

      {nutrition && (
        <Reveal as="section" aria-labelledby="h-nutr"
          className="mx-6 mt-28 rounded-[48px] border border-white/10 bg-[#0D1B13] px-8 py-16 text-white md:px-14">
          <div className="mx-auto max-w-[1220px]">
            <Step n={num('nutrition')} label={tr(nutrition.name, lang)} light />
            <h2 id="h-nutr" className="font-display text-[clamp(32px,4vw,48px)] font-medium tracking-[-0.045em]">{t('product.per100')}</h2>
            <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
              {nutrition.items.map((it) => (
                <div key={it.key} className="border-t border-white/20 pt-6">
                  <p className="font-display text-[clamp(52px,6vw,84px)] font-medium leading-none tracking-[-0.05em] text-[#C8F169]">
                    <BigNumber item={it} lang={lang} />
                    {it.unit && <span className="ml-2 text-[22px] text-white/70">{tr(it.unit, lang)}</span>}
                  </p>
                  <p className="mt-3.5 text-white/75">{tr(it.name, lang)}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      <div className="mx-auto max-w-[1320px] px-6">
        {storage && (
          <Reveal as="section" className="mt-28">
            <Step n={num('storage')} label={tr(storage.name, lang)} />
            <div className="grid gap-5 md:grid-cols-3">
              {storage.items.map((it) => (
                <div key={it.key} className="tilt rounded-[32px] bg-surface p-8">
                  <span className="tilt-icon flex size-[60px] items-center justify-center rounded-[20px]" style={{ background: dept.soft }}>
                    <Icon name={STORAGE_ICONS[it.key] ?? 'check'} className="size-7" strokeWidth={1.5} style={{ color: dept.tint }} />
                  </span>
                  <p className="mt-7 font-display text-[30px] font-medium tracking-[-0.04em]">{formatValue(it, lang)}</p>
                  <p className="mt-2 text-[15px] text-muted">{tr(it.name, lang)}</p>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        <Reveal as="section" className="mt-28 flex flex-wrap items-start gap-12">
          <div className="flex-[1_1_420px]">
            <Step n={num('ingredients')} label={t('product.specs.ingredients')} />
            <p className="text-[22px] leading-relaxed">{t('product.tbd')}</p>
          </div>
          <details className="flex-[1_1_420px] rounded-[28px] bg-surface px-6 py-5" open>
            <summary className="min-h-8 cursor-pointer text-[17px] font-semibold">{t('product.allChars')}</summary>
            <Characteristics groups={product.attributes} boxed={false} />
          </details>
        </Reveal>

        <RelatedProducts dept={dept} products={related} />
      </div>
    </main>
  )
}
