import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'motion/react'
import WordReveal from '@/components/ui/WordReveal'
import Photo from '@/components/ui/Photo'
import PackPicker from '@/components/product/PackPicker'
import ProductActions from '@/components/product/ProductActions'
import KeyFacts from '@/components/product/KeyFacts'
import { productPhotos } from '@/lib/productPhotos'
import { formatValue, minorRows } from '@/lib/attributes'
import { tr } from '@/lib/tr'
import { Icon } from '@/icons'

const roundBtn = 'flex items-center justify-center rounded-full bg-white text-[#0D1B13] transition duration-300 hover:scale-105 hover:bg-[#C8F169]'

// Quick view 1 — centred window over the page
export default function QuickViewModal({ product, dept, index, total, onClose, onPrev, onNext }) {
  const { t } = useTranslation()
  const { lang } = useParams()
  const closeRef = useRef(null)
  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
      onClick={onClose}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[#0D1B13]/50 p-3 backdrop-blur-md md:p-8">
      {total > 1 && (
        <>
          <button type="button" onClick={(e) => { e.stopPropagation(); onPrev() }} aria-label={t('product.quick.prev')}
            className={`${roundBtn} absolute left-6 top-1/2 hidden size-14 -translate-y-1/2 lg:flex`}>
            <Icon name="chevron" strokeWidth={2} className="size-5 rotate-90" />
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); onNext() }} aria-label={t('product.quick.next')}
            className={`${roundBtn} absolute right-6 top-1/2 hidden size-14 -translate-y-1/2 lg:flex`}>
            <Icon name="chevron" strokeWidth={2} className="size-5 -rotate-90" />
          </button>
        </>
      )}
      <motion.div role="dialog" aria-modal="true" aria-label={tr(product.name, lang)}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative max-h-[calc(100dvh-24px)] w-full max-w-[1060px] overflow-y-auto rounded-[32px] bg-surface p-4 shadow-[0_40px_100px_rgba(13,27,19,0.3)] md:max-h-[calc(100dvh-64px)] md:rounded-[40px] md:p-6">
        <button ref={closeRef} type="button" onClick={onClose} aria-label={t('product.quick.close')}
          className={`${roundBtn} absolute right-4 top-4 z-10 size-12 shadow-[0_6px_18px_rgba(13,27,19,0.12)]`}>
          <Icon name="close" strokeWidth={2} />
        </button>
        <AnimatePresence mode="wait">
          <ModalContent key={product.slug} product={product} dept={dept} index={index} total={total} />
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

function ModalContent({ product, dept, index, total }) {
  const { t } = useTranslation()
  const { lang } = useParams()
  const [photo, setPhoto] = useState(0)
  const [pack, setPack] = useState(product.weights[0])
  const photos = productPhotos(product, dept)
  const rows = minorRows(product.attributes, 3)
  const category = dept.categories.find((c) => c.key === product.cat)
  const name = tr(product.name, lang)

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
      className="flex flex-col gap-6 md:flex-row md:gap-9">
      <div className="flex flex-col gap-2.5 md:w-[46%] md:shrink-0">
        <div className="relative aspect-square overflow-hidden rounded-[28px]" style={{ background: dept.soft }}>
          <Photo key={photo} id={photos[photo].id} position={photos[photo].pos} w={900} eager alt={name}>
            <span className="absolute inset-0 flex items-center justify-center">
              <Icon name={dept.icon} strokeWidth={0.55} className="size-[200px]" style={{ color: dept.tint }} />
            </span>
          </Photo>
          <span className="absolute left-4 top-4 flex gap-2">
            <span className="rounded-full bg-[#C8F169] px-3 py-1.5 text-[13px] font-semibold text-[#0D1B13]">
              {product.isNew ? t('product.new') : t('product.halal')}
            </span>
          </span>
        </div>
        <div role="group" aria-label={t('product.photos')} className="grid grid-cols-4 gap-2.5">
          {photos.map((ph, i) => (
            <button key={i} type="button" onClick={() => setPhoto(i)} aria-pressed={i === photo}
              aria-label={t('product.showPhoto', { n: i + 1 })}
              className={`relative aspect-square overflow-hidden rounded-[18px] border-2 transition ${i === photo ? 'border-ink' : 'border-transparent'}`}
              style={{ background: dept.soft }}>
              <Photo id={ph.id} position={ph.pos} w={200} />
            </button>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-5 md:py-3 md:pr-14">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full py-1.5 pl-2.5 pr-3.5 text-sm text-[#0D1B13]" style={{ background: dept.soft }}>
            <span className="size-2 rounded-full" style={{ background: dept.tint }} />
            {tr(dept.name, lang)}{category ? ` · ${tr(category.name, lang)}` : ''}
          </span>
          {total > 1 && <span className="text-[13px] text-muted">{t('product.quick.counter', { n: index + 1, total })}</span>}
        </div>
        <h2 className="font-display text-[clamp(30px,3.4vw,42px)] font-medium leading-[1.05] tracking-[-0.045em]">
          <WordReveal text={name} delay={0.1} step={0.06} />
        </h2>
        <p className="leading-relaxed text-muted">{t('product.short')}</p>
        <PackPicker product={product} value={pack} onChange={setPack} />
        <KeyFacts groups={product.attributes} size="sm" limit={3} />
        {rows.length > 0 && (
          <dl>
            {rows.map((it, i) => (
              <div key={it.key} className={`flex justify-between gap-4 py-3 text-[15px] ${i < rows.length - 1 ? 'border-b border-line' : ''}`}>
                <dt className="text-muted">{tr(it.name, lang)}</dt>
                <dd className="text-right font-medium">{formatValue(it, lang)}</dd>
              </div>
            ))}
          </dl>
        )}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
          <ProductActions dept={dept} showPhone={false} size="md" />
          <Link to={`/${lang}/departments/${product.dept}/${product.slug}`}
            className="group inline-flex min-h-11 items-center gap-2 text-[15px] font-medium">
            {t('product.quick.openPage')}
            <Icon name="arrow" className="size-[18px] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.8} />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
