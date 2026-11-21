import { deptPhotos, productPhoto } from '@/data/images'

// Temporary photo set for a product (later: the product's own uploaded photos)
export function productPhotos(product, dept) {
  const main = productPhoto(product)
  const extra = deptPhotos[dept.slug]
  return [
    { id: main, pos: 'center' },
    { id: extra, pos: 'center' },
    { id: main, pos: 'top' },
    { id: extra, pos: 'bottom' },
  ]
}
