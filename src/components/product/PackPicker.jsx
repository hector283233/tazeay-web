import { useTranslation } from 'react-i18next'
import ChipGroup from '@/components/ui/ChipGroup'
import { weight } from '@/lib/format'

// Pack sizes: a switch when there are several, plain text when there is one
export default function PackPicker({ product, value, onChange, showTitle = true }) {
  const { t } = useTranslation()
  if (!product.weights.length) return null
  return (
    <div>
      {showTitle && <h3 className="mb-3 text-sm font-semibold">{t('product.pack')}</h3>}
      {product.weights.length > 1 ? (
        <ChipGroup label={t('product.pack')} value={value} onChange={onChange}
          options={product.weights.map((w) => ({ value: w, label: weight(w, t) }))} />
      ) : (
        <span className="inline-flex h-11 items-center rounded-full border border-line bg-surface px-5 text-[15px] font-medium">
          {weight(product.weights[0], t)}
        </span>
      )}
    </div>
  )
}
