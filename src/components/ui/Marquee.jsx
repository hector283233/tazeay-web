export default function Marquee({ items, reverse = false, outline = false }) {
  const list = [...items, ...items]
  return (
    <div className="flex w-max animate-marquee"
      style={reverse ? { animationDirection: 'reverse', animationDuration: '46s' } : undefined}>
      {list.map((text, i) => (
        <span key={i}
          className={`inline-flex items-center gap-7 whitespace-nowrap pr-7 font-display text-[clamp(28px,3.5vw,44px)] font-medium tracking-[-0.03em] ${outline ? 'text-outline' : ''}`}>
          {text}
          <span className={`size-2.5 rounded-full ${outline ? 'bg-ink' : 'bg-accent'}`} />
        </span>
      ))}
    </div>
  )
}