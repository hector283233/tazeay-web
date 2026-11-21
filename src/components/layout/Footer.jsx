import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { departments } from '@/data/departments'
import { tr } from '@/lib/tr'
import { Icon } from '@/icons'
import Logo from './Logo'

export default function Footer() {
  const { lang } = useParams()
  const { t } = useTranslation()
  const base = `/${lang}`
  const head = 'mb-4 text-[13px] font-medium uppercase tracking-[0.08em] text-[#C8F169]'
  const link = 'text-[#DCE3D8] transition-colors hover:text-white'

  return (
    <div className="mt-32 p-3.5">
      <footer className="relative overflow-hidden rounded-[40px] bg-[#0D1B13] px-6 pt-16 text-[#EEF2EA] md:px-14 md:pt-[72px]">
        <div aria-hidden className="pointer-events-none absolute -right-28 -top-28 size-[420px] rounded-full bg-[radial-gradient(circle,rgba(200,241,105,0.22),transparent_70%)]" />

        <div className="relative flex flex-wrap items-end justify-between gap-8 border-b border-[#23362A] pb-14">
          <h2 className="max-w-[720px] font-display text-4xl font-medium leading-[1.05] tracking-[-0.03em] md:text-[52px]">{t('footer.cta')}</h2>
          <Link to={`${base}/contacts`}
            className="btn-shine inline-flex h-[60px] items-center gap-3 rounded-full bg-[#C8F169] pl-7 pr-3 text-[17px] font-semibold text-[#0D1B13]">
            {t('common.contact')}
            <span className="flex size-10 items-center justify-center rounded-full bg-[#0D1B13] text-[#C8F169]"><Icon name="arrow" strokeWidth={2} className="size-[18px]" /></span>
          </Link>
        </div>

        <div className="relative grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10 py-12">
          <div>
            <span className="inline-flex h-[46px] w-20 items-center justify-center">
              {/* <span className="text-[15px] font-bold italic text-[#FFD23F]">Täze Aý</span> */}
              <Logo />
            </span>
            <p className="mt-4 max-w-60 text-[15px] leading-relaxed text-[#A7B3A9]">{t('footer.about')}</p>
            <div className="mt-4 flex gap-2">
              {['instagram', 'youtube'].map((s) => (
                <a key={s} href="#" aria-label={s} className="btn-shine flex size-11 items-center justify-center rounded-full bg-[#1A2E22]">
                  <Icon name={s} className="size-[19px]" strokeWidth={1.6} />
                </a>
              ))}
            </div>
          </div>
          <nav aria-label={t('footer.departments')}>
            <h3 className={head}>{t('footer.departments')}</h3>
            <ul className="flex flex-col gap-2.5 text-[15px]">
              {departments.slice(0, 4).map((d) => (
                <li key={d.slug}><Link to={`${base}/departments/${d.slug}`} className={link}>{tr(d.name, lang)}</Link></li>
              ))}
              <li><Link to={`${base}/departments`} className="font-semibold text-white">{t('footer.all')} →</Link></li>
            </ul>
          </nav>
          <nav aria-label={t('footer.company')}>
            <h3 className={head}>{t('footer.company')}</h3>
            <ul className="flex flex-col gap-2.5 text-[15px]">
              <li><Link to={`${base}/about`} className={link}>{t('nav.about')}</Link></li>
              <li><Link to={`${base}/about#factories`} className={link}>{t('footer.factories')}</Link></li>
              <li><Link to={`${base}/gallery`} className={link}>{t('nav.gallery')}</Link></li>
              <li><Link to={`${base}/news`} className={link}>{t('nav.news')}</Link></li>
              <li><Link to={`${base}/contacts`} className={link}>{t('nav.contacts')}</Link></li>
            </ul>
          </nav>
          <div>
            <h3 className={head}>{t('footer.contacts')}</h3>
            <ul className="flex flex-col gap-2.5 text-[15px] leading-snug text-[#DCE3D8]">
              <li>{t('footer.address')}</li>
              <li><a href="tel:+99352218491" className={link}>+993 522 1 84 91</a></li>
              <li><a href="mailto:info@tazeay.com" className="text-white">info@tazeay.com</a></li>
            </ul>
          </div>
        </div>

        <div aria-hidden className="relative -mx-10 -mb-6 select-none whitespace-nowrap text-center font-display text-[clamp(80px,15vw,220px)] font-semibold leading-[0.8] tracking-[-0.05em] text-[#16291E]">
          TÄZE AÝ
        </div>
        {/* <Logo /> */}
        <div className="relative flex flex-wrap justify-between gap-3 border-t border-[#23362A] pb-7 pt-5 text-sm text-[#A7B3A9]">
          <span>© {new Date().getFullYear()} Täze Aý</span>
          <span>TM · EN · RU</span>
        </div>
      </footer>
    </div>
  )
}