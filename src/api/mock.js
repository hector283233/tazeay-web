import { departments } from '@/data/departments'
import { products } from '@/data/products'
import { news, gallery } from '@/data/content'
import { attributesFor } from '@/data/attributes'
import { departmentLayouts, departmentQuickViews, siteSettings } from '@/data/settings'

const wait = (data) => new Promise((resolve) => setTimeout(() => resolve(data), 150))

const withDisplay = (dept) =>
  dept
    ? { ...dept, layout: departmentLayouts[dept.slug] ?? null, quickView: departmentQuickViews[dept.slug] ?? null }
    : null
const withAttributes = (product) => (product ? { ...product, attributes: attributesFor(product) } : null)

export const api = {
  settings: () => wait(siteSettings),
  departments: () => wait(departments.map(withDisplay)),
  department: (slug) => wait(withDisplay(departments.find((d) => d.slug === slug))),
  products: (dept) => wait(products.filter((p) => p.dept === dept)),
  product: (dept, slug) =>
    wait(withAttributes(products.find((p) => p.dept === dept && p.slug === slug))),
  news: () => wait(news),
  newsItem: (slug) => wait(news.find((n) => n.slug === slug) ?? null),
  gallery: () => wait(gallery),
  sendContact: (data) => new Promise((resolve) => setTimeout(() => resolve({ ok: true, data }), 900)),
}
