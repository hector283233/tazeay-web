import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'motion/react'
import WordReveal from '@/components/ui/WordReveal'
import Reveal from '@/components/ui/Reveal'
import Photo from '@/components/ui/Photo'
import DeptChip from '@/components/product/DeptChip'
import PackPicker from '@/components/product/PackPicker'
import ProductActions from '@/components/product/ProductActions'
import Characteristics from '@/components/product/Characteristics'
import KeyFacts from '@/components/product/KeyFacts'
import ProductBreadcrumbs from '@/components/product/ProductBreadcrumbs'
import RelatedProducts from '@/components/product/RelatedProducts'
import { productPhotos } from '@/lib/productPhotos'
import { tr } from '@/lib/tr'
import { Icon } from '@/icons'

// grid places for the three small photos (desktop: one wide on top, two below)
const TILE_CLASSES = ['aspect-square md:col-span-2 md:aspect-auto', 'aspect-square md:aspect-auto', 'aspect-square md:aspect-auto']

// Design 2 — large photo mosaic across the full width
export default function GalleryLayout({ product, dept, related }) {
  const { t } = useTranslation()
  const { lang } = useParams()
  const [main, setMain] = useState(0)
  const [pack, setPack] = useState(product.weights[0])
  const photos = productPhotos(product, dept)
  const others = photos.map((ph, i) => ({ ...ph, i })).filter((ph) => ph.i !== main)
  const name = tr(product.name, lang)

  return (
    <main className="mx-auto max-w-[1320px] px-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-10">
        <ProductBreadcrumbs product={product} dept={dept} />
      </motion.div>

      <motion.section aria-label={t('product.photos')}
        initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        className="mt-6 grid grid-cols-3 gap-3 md:grid-cols-[2fr_1fr_1fr] md:grid-rows-[250px_250px]">
        <div className="relative col-span-3 aspect-[4/3] overflow-hidden rounded-[40px] md:col-span-1 md:row-span-2 md:aspect-auto"
          style={{ background: dept.soft }}>
          <AnimatePresence mode="wait">
            <motion.div key={main} className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}>
              <Photo id={photos[main].id} position={photos[main].pos} w={1400} eager alt={name}>
                <span className="absolute inset-0 flex items-center justify-center">
                  <Icon name={dept.icon} strokeWidth={0.55} className="size-[240px]" style={{ color: dept.tint }} />
                </span>
              </Photo>
            </motion.div>
          </AnimatePresence>
          <span className="absolute left-5 top-5 flex gap-2">
            <span className="rounded-full bg-[#C8F169] px-3.5 py-1.5 text-[13px] font-semibold text-[#0D1B13]">{t('product.halal')}</span>
            {product.isNew && <span className="rounded-full bg-white px-3.5 py-1.5 text-[13px] font-medium text-[#0D1B13]">{t('product.new')}</span>}
          </span>
          <span className="absolute bottom-5 right-5 rounded-full bg-white/85 px-3.5 py-1.5 text-[13px] text-[#0D1B13] backdrop-blur">
            {t('product.photo', { n: main + 1, total: photos.length })}
          </span>
        </div>
        {others.map((ph, n) => (
          <button key={ph.i} type="button" onClick={() => setMain(ph.i)}
            aria-label={t('product.showPhoto', { n: ph.i + 1 })}
            className={`group relative overflow-hidden rounded-[32px] ${TILE_CLASSES[n]}`}
            style={{ background: dept.soft }}>
            <Photo id={ph.id} position={ph.pos} w={700} className="transition-transform duration-700 ease-brand group-hover:scale-110">
              <span className="absolute inset-0 flex items-center justify-center">
                <Icon name={dept.icon} strokeWidth={0.7} className="size-24" style={{ color: dept.tint }} />
              </span>
            </Photo>
          </button>
        ))}
      </motion.section>

      <section className="mt-11 flex flex-wrap items-end justify-between gap-8">
        <div>
          <DeptChip dept={dept} product={product} />
          <h1 className="mt-4 font-display text-[clamp(44px,6vw,76px)] font-medium leading-none tracking-[-0.05em]">
            <WordReveal text={name} delay={0.2} />
          </h1>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          className="flex flex-col items-start gap-4 md:items-end">
          <PackPicker product={product} value={pack} onChange={setPack} showTitle={false} />
          <ProductActions dept={dept} className="md:justify-end" />
        </motion.div>
      </section>

      <Reveal>
        <KeyFacts groups={product.attributes} className="mt-10" />
      </Reveal>

      <section className="mt-[72px] flex flex-wrap items-start gap-12">
        <Reveal className="flex-[1.3_1_480px]">
          <h2 className="font-display text-[clamp(28px,3vw,36px)] font-medium tracking-[-0.04em]">{t('product.about')}</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">{t('product.desc')}</p>
          <h3 className="mt-9 text-[15px] font-semibold">{t('product.specs.ingredients')}</h3>
          <p className="mt-2.5 leading-relaxed text-muted">{t('product.tbd')}</p>
        </Reveal>
        <Reveal className="flex-[1_1_380px]" delay={0.1}>
          <h2 className="mb-5 font-display text-[clamp(28px,3vw,36px)] font-medium tracking-[-0.04em]">{t('product.chars')}</h2>
          <Characteristics groups={product.attributes} />
        </Reveal>
      </section>

      <RelatedProducts dept={dept} products={related} />
    </main>
  )
}
