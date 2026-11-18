import { departments } from '@/data/departments'
import { products } from '@/data/products'
import { news, gallery } from '@/data/content'

const wait = (data) => new Promise((resolve) => setTimeout(() => resolve(data), 150))

export const api = {
  departments: () => wait(departments),
  department: (slug) => wait(departments.find((d) => d.slug === slug) ?? null),
  products: (dept) => wait(products.filter((p) => p.dept === dept)),
  product: (dept, slug) => wait(products.find((p) => p.dept === dept && p.slug === slug) ?? null),
  news: () => wait(news),
  newsItem: (slug) => wait(news.find((n) => n.slug === slug) ?? null),
  gallery: () => wait(gallery),
  sendContact: (data) => new Promise((resolve) => setTimeout(() => resolve({ ok: true, data }), 900)),
}