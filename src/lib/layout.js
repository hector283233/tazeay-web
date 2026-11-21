export const PRODUCT_LAYOUTS = ['classic', 'gallery', 'story']
export const QUICK_VIEWS = ['modal', 'drawer', 'off']

const valid = (list, value) => (list.includes(value) ? value : null)

// product's own choice → department default → site default → classic
export const pickLayout = (product, dept, settings, override) =>
  valid(PRODUCT_LAYOUTS, override) ||
  valid(PRODUCT_LAYOUTS, product?.layout) ||
  valid(PRODUCT_LAYOUTS, dept?.layout) ||
  valid(PRODUCT_LAYOUTS, settings?.productLayout) ||
  'classic'

export const pickQuickView = (dept, settings, override) =>
  valid(QUICK_VIEWS, override) ||
  valid(QUICK_VIEWS, dept?.quickView) ||
  valid(QUICK_VIEWS, settings?.quickView) ||
  'modal'