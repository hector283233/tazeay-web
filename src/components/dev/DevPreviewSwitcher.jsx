import { useState } from 'react'
import { setDevPreview, useDevPreview } from '@/lib/devPreview'
import { PRODUCT_LAYOUTS, QUICK_VIEWS } from '@/lib/layout'

// Development only: try every product design without the admin panel.
// "auto" = use what the data / admin settings say.
const GROUPS = [
  { key: 'layout', label: 'Страница товара', options: PRODUCT_LAYOUTS },
  { key: 'quickView', label: 'Быстрый просмотр', options: QUICK_VIEWS },
]

export default function DevPreviewSwitcher() {
  const preview = useDevPreview()
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-4 left-4 z-[150] text-[13px] text-[#0D1B13]">
      {open ? (
        <div className="w-[300px] rounded-[22px] border border-black/10 bg-white p-3.5 shadow-[0_20px_50px_rgba(13,27,19,0.2)]">
          <div className="mb-2 flex items-center justify-between">
            <strong>Предпросмотр дизайна (dev)</strong>
            <button type="button" onClick={() => setOpen(false)} className="rounded-full px-2 py-1 hover:bg-black/5">✕</button>
          </div>
          {GROUPS.map((g) => (
            <div key={g.key} className="mt-2.5">
              <p className="mb-1.5 text-[#59645C]">{g.label}</p>
              <div className="flex flex-wrap gap-1">
                {['auto', ...g.options].map((o) => {
                  const active = (preview[g.key] ?? 'auto') === o
                  return (
                    <button key={o} type="button" aria-pressed={active}
                      onClick={() => setDevPreview({ [g.key]: o === 'auto' ? undefined : o })}
                      className={`h-8 rounded-full px-3 ${active ? 'bg-[#0D1B13] text-[#C8F169]' : 'bg-[#F4F4EF] hover:bg-[#E8EAE2]'}`}>
                      {o}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <button type="button" onClick={() => setOpen(true)}
          className="h-10 rounded-full bg-[#0D1B13] px-4 font-medium text-[#C8F169] shadow-lg">
          Дизайн ✦
        </button>
      )}
    </div>
  )
}
