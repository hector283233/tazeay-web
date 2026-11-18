export default function SectionHead({ id, eyebrow, title, dot = 'bg-primary', right }) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
      <div>
        {eyebrow && (
          <span className="inline-flex items-center gap-2 text-sm font-medium text-muted">
            <span className={`size-2 rounded-full ${dot}`} />{eyebrow}
          </span>
        )}
        <h2 id={id} className="mt-3 font-display text-[clamp(36px,4.5vw,56px)] font-medium leading-none tracking-[-0.045em]">
          {title}
        </h2>
      </div>
      {right}
    </div>
  )
}