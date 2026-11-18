import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'motion/react'
import { Icon } from '@/icons'

export default function Lightbox({ items, index, onClose, onIndex, renderItem, caption }) {
  const { t } = useTranslation()
  const closeRef = useRef(null)
  const open = index !== null && index >= 0 && index < items.length
  const n = items.length

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onIndex((index + 1) % n)
      if (e.key === 'ArrowLeft') onIndex((index - 1 + n) % n)
    }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [open, index, n, onClose, onIndex])

  const roundBtn = 'btn-shine absolute flex items-center justify-center rounded-full'

  return (
    <AnimatePresence>
      {open && (
        <motion.div role="dialog" aria-modal="true" aria-label={t('gallery.viewer')} onClick={onClose}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#0D1B13]/85 p-8 backdrop-blur-md">
          <motion.div key={index} onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative aspect-[16/10] w-[min(1000px,100%)] overflow-hidden rounded-[36px]">
            {renderItem(items[index])}
            <span className="absolute bottom-5 left-5 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#0D1B13]">
              {caption(items[index])} · {index + 1} / {n}
            </span>
            <button ref={closeRef} type="button" onClick={onClose} aria-label={t('gallery.close')}
              className={`${roundBtn} right-4 top-4 size-12 bg-white text-[#0D1B13]`}>
              <Icon name="close" strokeWidth={2} />
            </button>
            <button type="button" onClick={() => onIndex((index - 1 + n) % n)} aria-label={t('gallery.prev')}
              className={`${roundBtn} left-4 top-1/2 size-[52px] -translate-y-1/2 bg-[#C8F169] text-[#0D1B13]`}>
              <Icon name="chevron" strokeWidth={2} className="size-5 rotate-90" />
            </button>
            <button type="button" onClick={() => onIndex((index + 1) % n)} aria-label={t('gallery.next')}
              className={`${roundBtn} right-4 top-1/2 size-[52px] -translate-y-1/2 bg-[#C8F169] text-[#0D1B13]`}>
              <Icon name="chevron" strokeWidth={2} className="size-5 -rotate-90" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}