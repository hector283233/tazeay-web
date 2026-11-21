import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'motion/react'
import WordReveal from '@/components/ui/WordReveal'
import Photo from '@/components/ui/Photo'
import PackPicker from '@/components/product/PackPicker'
import ProductActions from '@/components/product/ProductActions'
import KeyFacts from '@/components/product/KeyFacts'
import Characteristics from '@/components/product/Characteristics'
import { productPhotos } from '@/lib/productPhotos'
import { tr } from '@/lib/tr'
import { Icon } from '@/icons'

const TABS = ['desc', 'chars', 'comp']
const navBtn = 'flex size-12 items-center justify-center rounded-full border border-line bg-surface transition duration-300 hover:scale-105 hover:bg-[#C8F169] hover:text-[#0D1B13]'

// Quick view 2 — panel that slides in from the right
export default function QuickViewDrawer({ product, dept, total, onClose, onPrev, onNext }) {
  const { t } = useTranslation()
  const { lang } = useParams()
  const closeRef = useRef(null)
  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  return (
    <motion.div className="fixed inset-0 z-[90]" exit={{ opacity: 0, transition: { delay: 0.4, duration: 0.15 } }}>
      <motion.button type="button" onClick={onClose} aria-label={t('product.quick.close')} tabIndex={-1}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 cursor-default bg-[#0D1B13]/40 backdrop-blur-[3px]" />
      <motion.aside role="dialog" aria-modal="true" aria-label={tr(product.name, lang)}
        initial={{ x: '105%' }} animate={{ x: 0 }} exit={{ x: '105%' }}
        transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
        className="absolute inset-y-0 right-0 flex w-full max-w-[600px] flex-col overflow-hidden bg-surface shadow-[-30px_0_80px_rgba(13,27,19,0.25)] sm:inset-y-3 sm:right-3 sm:rounded-[36px]">
        <button ref={closeRef} type="button" onClick={onClose} aria-label={t('product.quick.close')}
          className="absolute right-5 top-5 z-10 flex size-12 items-center justify-center rounded-full bg-white text-[#0D1B13] shadow-[0_6px_18px_rgba(13,27,19,0.12)] transition hover:scale-105 hover:bg-[#C8F169]">
          <Icon name="close" strokeWidth={2} />
        </button>

        <div className="flex-1 overflow-y-auto p-4 pb-6">
          <AnimatePresence mode="wait">
            <DrawerContent key={product.slug} product={product} dept={dept} />
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-4">
          <div className="flex gap-2">
            {total > 1 && (
              <>
                <button type="button" onClick={onPrev} aria-label={t('product.quick.prev')} className={navBtn}>
                  <Icon name="chevron" strokeWidth={2} className="size-5 rotate-90" />
                </button>
                <button type="button" onClick={onNext} aria-label={t('product.quick.next')} className={navBtn}>
                  <Icon name="chevron" strokeWidth={2} className="size-5 -rotate-90" />
                </button>
              </>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Link to={`/${lang}/departments/${product.dept}/${product.slug}`}
              className="inline-flex h-[52px] items-center rounded-full px-4 text-[15px] font-medium hover:bg-bg">
              {t('product.quick.more')}
            </Link>
            <ProductActions dept={dept} showPhone={false} size="md" />
          </div>
        </div>
      </motion.aside>
    </motion.div>
  )
}

function DrawerContent({ product, dept }) {
  const { t } = useTranslation()
  const { lang } = useParams()
  const [photo, setPhoto] = useState(0)
  const [pack, setPack] = useState(product.weights[0])
  const [tab, setTab] = useState('desc')
  const photos = productPhotos(product, dept)
  const category = dept.categories.find((c) => c.key === product.cat)
  const name = tr(product.name, lang)

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}>
      <div className="relative h-[300px] overflow-hidden rounded-[28px] sm:h-[330px]" style={{ background: dept.soft }}>
        <Photo key={photo} id={photos[photo].id} position={photos[photo].pos} w={900} eager alt={name}>
          <span className="absolute inset-0 flex items-center justify-center">
            <Icon name={dept.icon} strokeWidth={0.55} className="size-[180px]" style={{ color: dept.tint }} />
          </span>
        </Photo>
        <span className="absolute left-4 top-4 rounded-full bg-[#C8F169] px-3 py-1.5 text-[13px] font-semibold text-[#0D1B13]">
          {product.isNew ? t('product.new') : t('product.halal')}
        </span>
        <span role="group" aria-label={t('product.photos')}
          className="absolute bottom-3.5 left-1/2 flex -translate-x-1/2 gap-1 rounded-full bg-white/80 px-2 py-1 backdrop-blur">
          {photos.map((ph, i) => (
            <button key={i} type="button" onClick={() => setPhoto(i)} aria-pressed={i === photo}
              aria-label={t('product.showPhoto', { n: i + 1 })} className="flex size-7 items-center justify-center">
              <span className={`size-2.5 rounded-full transition ${i === photo ? 'bg-[#0D1B13]' : 'bg-[#0D1B13]/25'}`} />
            </button>
          ))}
        </span>
      </div>

      <div className="flex flex-col gap-5 px-3 pt-6">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full py-1.5 pl-2.5 pr-3.5 text-sm text-[#0D1B13]" style={{ background: dept.soft }}>
            <span className="size-2 rounded-full" style={{ background: dept.tint }} />
            {tr(dept.name, lang)}{category ? ` · ${tr(category.name, lang)}` : ''}
          </span>
          <h2 className="mt-3.5 font-display text-[clamp(28px,3.2vw,38px)] font-medium leading-[1.05] tracking-[-0.045em]">
            <WordReveal text={name} delay={0.1} step={0.06} />
          </h2>
        </div>
        <PackPicker product={product} value={pack} onChange={setPack} />

        <div role="tablist" aria-label={name} className="flex gap-1 rounded-full bg-bg p-1">
          {TABS.map((key) => (
            <button key={key} type="button" role="tab" aria-selected={tab === key} onClick={() => setTab(key)}
              className={`relative h-11 flex-1 rounded-full text-[15px] font-medium transition-colors ${tab === key ? '' : 'text-muted hover:text-ink'}`}>
              {tab === key && (
                <motion.span layoutId="qv-tab" className="absolute inset-0 rounded-full bg-surface shadow-[0_2px_8px_rgba(13,27,19,0.08)]"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
              )}
              <span className="relative">{t(`product.tabs.${key}`)}</span>
            </button>
          ))}
        </div>

        <div role="tabpanel">
          {tab === 'desc' && <p className="leading-relaxed text-muted">{t('product.desc')}</p>}
          {tab === 'chars' && (
            <>
              <KeyFacts groups={product.attributes} size="sm" limit={3} />
              <Characteristics groups={product.attributes} boxed={false} />
            </>
          )}
          {tab === 'comp' && (
            <>
              <p className="leading-relaxed text-muted">{t('product.tbd')}</p>
              <p className="mt-3.5 text-sm text-muted">{t('product.specs.maker')}: {t('product.makerValue')}</p>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}
