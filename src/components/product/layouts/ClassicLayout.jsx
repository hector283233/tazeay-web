import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'motion/react'
import WordReveal from '@/components/ui/WordReveal'
import Photo from '@/components/ui/Photo'
import DeptChip from '@/components/product/DeptChip'
import PackPicker from '@/components/product/PackPicker'
import ProductActions from '@/components/product/ProductActions'
import Characteristics from '@/components/product/Characteristics'
import ProductBreadcrumbs from '@/components/product/ProductBreadcrumbs'
import RelatedProducts from '@/components/product/RelatedProducts'
import { productPhotos } from '@/lib/productPhotos'
import { tr } from '@/lib/tr'
import { Icon } from '@/icons'

// Design 1 — photo on the left, information on the right
export default function ClassicLayout({ product, dept, related }) {
  const { t } = useTranslation()
  const { lang } = useParams()
  const [photo, setPhoto] = useState(0)
  const [pack, setPack] = useState(product.weights[0])
  const photos = productPhotos(product, dept)
  const category = dept.categories.find((c) => c.key === product.cat)

  return (
    <main className="mx-auto max-w-[1320px] px-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-10">
        <ProductBreadcrumbs product={product} dept={dept} />
      </motion.div>

      <section className="mt-7 flex flex-wrap items-start gap-12">
        {/* gallery */}
        <div className="flex flex-[1.15_1_480px] flex-col gap-3">
          <div className="relative aspect-[1/0.92] overflow-hidden rounded-[40px]">
            <AnimatePresence mode="wait">
              <motion.div key={photo} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                className="absolute inset-0" style={{ background: dept.soft }}>
                <Photo id={photos[photo].id} position={photos[photo].pos} w={1200} eager alt={tr(product.name, lang)}>
                  <span className="absolute inset-0 flex items-center justify-center">
                    <Icon name={dept.icon} strokeWidth={0.55} className="size-[230px]" style={{ color: dept.tint }} />
                  </span>
                </Photo>
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
            {photos.map((ph, i) => (
              <button key={i} type="button" onClick={() => setPhoto(i)} aria-pressed={i === photo}
                aria-label={t('product.showPhoto', { n: i + 1 })}
                className={`relative aspect-square overflow-hidden rounded-[22px] border-2 transition duration-300 hover:-translate-y-0.5 ${i === photo ? 'border-ink' : 'border-transparent'}`}
                style={{ background: dept.soft }}>
                <Photo id={ph.id} position={ph.pos} w={240} />
              </button>
            ))}
          </div>
        </div>

        {/* info */}
        <div className="flex flex-[1_1_400px] flex-col gap-7 lg:sticky lg:top-28">
          <div>
            <DeptChip dept={dept} product={product} />
            <h1 className="mt-4 font-display text-[clamp(40px,5vw,60px)] font-medium leading-none tracking-[-0.05em]">
              <WordReveal text={tr(product.name, lang)} delay={0.15} />
            </h1>
          </div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-[17px] leading-relaxed text-muted">{t('product.desc')}</motion.p>

          <PackPicker product={product} value={pack} onChange={setPack} />
          <Characteristics groups={product.attributes} />
          <ProductActions dept={dept} />
        </div>
      </section>

      <RelatedProducts dept={dept} products={related} />
    </main>
  )
}
