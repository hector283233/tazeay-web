import { useParams } from 'react-router-dom'
import { useSeo } from '@/hooks/useSeo'
import { useProductDisplay } from '@/hooks/useProductDisplay'
import { useDepartment, useProduct, useProducts } from '@/api/hooks'
import PageLoader from '@/components/ui/PageLoader'
import ClassicLayout from '@/components/product/layouts/ClassicLayout'
import GalleryLayout from '@/components/product/layouts/GalleryLayout'
import StoryLayout from '@/components/product/layouts/StoryLayout'
import NotFound from '@/pages/NotFound'
import { tr } from '@/lib/tr'

export default function Product() {
  const { lang, deptSlug, productSlug } = useParams()
  const { data: product, isLoading } = useProduct(deptSlug, productSlug)
  const { data: dept } = useDepartment(deptSlug)
  const { data: siblings = [] } = useProducts(deptSlug)
  const { layoutFor } = useProductDisplay()
  useSeo(product && dept ? `${tr(product.name, lang)} — ${tr(dept.name, lang)}` : null)

  if (isLoading || (product && !dept)) return <PageLoader />
  if (!product) return <NotFound />

  const related = siblings.filter((p) => p.slug !== product.slug).slice(0, 4)
  const props = { product, dept, related }
  const layout = layoutFor(product, dept)

  // the design is chosen in the admin panel: product → department → whole site
  if (layout === 'gallery') return <GalleryLayout key={productSlug} {...props} />
  if (layout === 'story') return <StoryLayout key={productSlug} {...props} />
  return <ClassicLayout key={productSlug} {...props} />
}
