import { useEffect } from 'react'
import { AnimatePresence } from 'motion/react'
import { useDepartment, useProduct, useProducts } from '@/api/hooks'
import { useProductDisplay } from '@/hooks/useProductDisplay'
import { useQuickView } from '@/hooks/useQuickView'
import QuickViewModal from './QuickViewModal'
import QuickViewDrawer from './QuickViewDrawer'

// Shows the quick view chosen in the admin panel when the address has ?view=dept/product
export default function QuickViewHost() {
  const { view, go, close } = useQuickView()
  const { quickView } = useProductDisplay()
  const [deptSlug, slug] = (view ?? '').split('/')
  const { data: product } = useProduct(deptSlug, slug)
  const { data: dept } = useDepartment(deptSlug)
  const { data: siblings = [] } = useProducts(deptSlug)

  const open = Boolean(view && quickView !== 'off' && product && dept)
  const index = product ? siblings.findIndex((p) => p.slug === product.slug) : -1
  const total = siblings.length
  const prev = () => total > 1 && go(siblings[(index - 1 + total) % total])
  const next = () => total > 1 && go(siblings[(index + 1) % total])

  useEffect(() => {
    if (!open) return
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKey)
    }
  })

  const props = { product, dept, index, total, onClose: close, onPrev: prev, onNext: next }

  return (
    <AnimatePresence>
      {open && (quickView === 'drawer'
        ? <QuickViewDrawer key="drawer" {...props} />
        : <QuickViewModal key="modal" {...props} />)}
    </AnimatePresence>
  )
}
