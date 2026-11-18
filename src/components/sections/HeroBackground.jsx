const HILLS = [
  'M0 300 C 200 240 380 280 560 250 S 900 200 1100 240 S 1320 260 1400 230 V 820 H0Z',
  'M0 380 C 260 330 420 390 700 340 S 1100 300 1400 350 V 820 H0Z',
  'M0 470 C 300 420 520 500 820 450 S 1200 420 1400 470 V 820 H0Z',
  'M0 580 C 280 540 600 610 900 560 S 1250 540 1400 590 V 820 H0Z',
  'M0 690 C 320 650 640 720 980 680 S 1300 660 1400 700 V 820 H0Z',
]

export default function HeroBackground({
  sky = ['#E2EED3', '#9DBF7F', '#4F7E37'],
  hills = ['#8DB36C', '#6E9A4D', '#5A8A3E', '#46762F', '#355F23'],
}) {
  return (
    <div aria-hidden="true" className="animate-kenburns absolute -inset-6">
      <svg viewBox="0 0 1400 820" preserveAspectRatio="xMidYMid slice" className="size-full">
        <defs>
          <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={sky[0]} /><stop offset="0.45" stopColor={sky[1]} /><stop offset="1" stopColor={sky[2]} />
          </linearGradient>
          <filter id="hero-soft"><feGaussianBlur stdDeviation="7" /></filter>
        </defs>
        <rect width="1400" height="820" fill="url(#hero-sky)" />
        <circle cx="1050" cy="150" r="140" fill="#F6F8E8" opacity="0.6" filter="url(#hero-soft)" />
        <g filter="url(#hero-soft)">
          {HILLS.map((d, i) => <path key={i} d={d} fill={hills[i]} />)}
        </g>
      </svg>
    </div>
  )
}