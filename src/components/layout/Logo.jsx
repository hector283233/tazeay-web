import { Link, useParams } from 'react-router-dom'

export default function Logo({ size = 'md' }) {
  const { lang } = useParams()
  const box = size === 'lg' ? 'h-[46px] w-20 text-[15px]' : 'h-11 w-[74px] text-sm'
  return (
    <Link to={`/${lang}`} aria-label="Täze Aý"
      className={`btn-shine flex shrink-0 items-center justify-center rounded-[50%] bg-[#C8102E] shadow-[inset_0_0_0_2px_#F4B400] ${box}`}>
      <span className="font-bold italic text-[#FFD23F]">Täze Aý</span>
    </Link>
  )
}