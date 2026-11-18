import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'

export default function Counter({ to, suffix = '', duration = 1.8, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduce = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, to, {
      duration, delay, ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (n) => setValue(Math.round(n)),
    })
    return () => controls.stop()
  }, [inView, reduce, to, duration, delay])

  const shown = reduce ? to : value

  return <span ref={ref} className={className}>{shown.toLocaleString('ru-RU')}{suffix}</span>
}