import { useState } from 'react'
import { px } from '@/data/images'

export default function Photo({ id, alt = '', w = 1200, className = '', position, eager = false, children = null }) {
  const [state, setState] = useState('loading') // loading | ok | error

  if (!id || state === 'error') return children

  return (
    <>
      {state !== 'ok' && children}
      <img
        src={px(id, w)}
        srcSet={`${px(id, w)} 1x, ${px(id, w * 2)} 2x`}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setState('ok')}
        onError={() => setState('error')}
        style={position ? { objectPosition: position } : undefined}
        className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${state === 'ok' ? 'opacity-100' : 'opacity-0'} ${className}`}
      />
    </>
  )
}