// D:\Projects\tazeay-web\src\components\layout\Logo.jsx
import { Link, useParams } from 'react-router-dom'
import logo from '@/assets/logo.png'

export default function Logo({ size = 'md' }) {
  const { lang } = useParams()
  const height = size === 'lg' ? 'h-14' : 'h-12'
  return (
    <Link to={`/${lang}`} aria-label="Täze Aý"
      className="flex shrink-0 items-center transition-transform duration-300 ease-brand hover:scale-110">
      <img src={logo} alt="Täze Aý" width="203" height="141"
        className={`${height} w-auto select-none drop-shadow-[0_4px_10px_rgba(13,27,19,0.15)]`} draggable="false" />
    </Link>
  )
}