import { useSettings } from '@/api/hooks'
import { useDevPreview } from '@/lib/devPreview'
import { pickLayout, pickQuickView } from '@/lib/layout'

// Which product page design and which quick view to use
export function useProductDisplay() {
  const { data: settings } = useSettings()
  const preview = useDevPreview()
  return {
    layoutFor: (product, dept) => pickLayout(product, dept, settings, preview.layout),
    quickView: pickQuickView(settings, preview.quickView),
  }
}
