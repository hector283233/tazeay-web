import { useSeo } from '@/hooks/useSeo'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'motion/react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { api } from '@/api/mock'
import PageIntro from '@/components/ui/PageIntro'
import ChipGroup from '@/components/ui/ChipGroup'
import { departments } from '@/data/departments'
import { tr } from '@/lib/tr'
import { Icon } from '@/icons'

const PIN = 'M12 21s-7-6-7-12a7 7 0 0 1 14 0c0 6-7 12-7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z'
const PHONE = 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2'
const MAIL = 'M3 5h18v14H3zM3 7l9 6 9-6'

const makeSchema = (t) => z.object({
  name: z.string().trim().min(2, t('contacts.errors.name')),
  surname: z.string().trim().optional(),
  email: z.string().trim().email(t('contacts.errors.email')),
  department: z.string(),
  subject: z.string().trim().optional(),
  message: z.string().trim().min(10, t('contacts.errors.message')),
})

function Field({ id, label, error, textarea = false, ...props }) {
  const cls = `w-full rounded-[18px] border bg-bg px-5 text-base text-ink outline-none transition focus:border-ink focus:shadow-[0_0_0_4px_rgba(200,241,105,0.6)] ${error ? 'border-[#C8102E]' : 'border-line'}`
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      {textarea
        ? <textarea id={id} rows={4} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} className={`${cls} resize-y py-4`} {...props} />
        : <input id={id} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} className={`${cls} h-14`} {...props} />}
      <AnimatePresence>
        {error && (
          <motion.span id={`${id}-err`} role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="text-[13px] text-[#C8102E]">{error}</motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Contacts() {
  const { t } = useTranslation()
  const { lang } = useParams()
  const [sentDept, setSentDept] = useState(null)
  useSeo(t('seo.contacts.t'), t('seo.contacts.d'))

  const deptOptions = [
    { value: 'general', label: t('contacts.general') },
    ...['fish', 'sausages', 'dairy', 'confectionery'].map((s) => ({
      value: s, label: tr(departments.find((d) => d.slug === s)?.name, lang),
    })),
  ]

  const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(makeSchema(t)),
    defaultValues: { name: '', surname: '', email: '', department: 'general', subject: '', message: '' },
  })

  const onSubmit = async (data) => {
    await api.sendContact(data)
    setSentDept(deptOptions.find((o) => o.value === data.department)?.label)
    reset()
  }

  const contacts = [
    { label: t('contacts.labels.address'), value: t('contacts.addressValue'), icon: PIN, href: null },
    { label: t('contacts.labels.dairy'), value: '+993 522 5 43 76', icon: PHONE, href: 'tel:+99352254376' },
    { label: t('contacts.labels.confectionery'), value: '+993 522 1 84 91', icon: PHONE, href: 'tel:+99352218491' },
    { label: t('contacts.labels.meat'), value: '+993 522 1 82 30', icon: PHONE, href: 'tel:+99352218230' },
    { label: t('contacts.labels.email'), value: 'info@tazeay.com', icon: MAIL, href: 'mailto:info@tazeay.com' },
  ]

  return (
    <main className="mx-auto max-w-[1320px] px-6">
      <PageIntro eyebrow={t('contacts.eyebrow')} title={t('contacts.title')} text={t('contacts.text')} />

      <section className="mt-14 flex flex-wrap items-stretch gap-3.5">
        {/* dark contacts card */}
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.9 }}
          className="relative flex flex-[1_1_420px] flex-col gap-7 overflow-hidden rounded-[40px] bg-[#0D1B13] p-6 text-[#EEF2EA] sm:p-10">
          <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-28 size-96 rounded-full bg-[radial-gradient(circle,rgba(200,241,105,0.22),transparent_70%)]" />
          <h2 className="relative font-display text-3xl font-medium tracking-[-0.03em]">{t('contacts.listTitle')}</h2>
          <ul className="relative flex flex-col gap-2">
            {contacts.map((c) => {
              const inner = (
                <>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-[14px] bg-[#C8F169] text-[#0D1B13] transition-transform duration-500 group-hover:-rotate-8 group-hover:scale-110">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true"><path d={c.icon} /></svg>
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13px] text-[#A7B3A9]">{c.label}</span>
                    <span className="mt-0.5 block text-base font-medium leading-snug">{c.value}</span>
                  </span>
                </>
              )
              const cls = 'group flex items-center gap-4 rounded-[20px] bg-[#16291E] p-3.5 transition duration-300 hover:translate-x-1 hover:bg-[#1D3326]'
              return (
                <li key={c.label}>
                  {c.href ? <a href={c.href} className={cls}>{inner}</a> : <div className={cls}>{inner}</div>}
                </li>
              )
            })}
          </ul>
          <div aria-hidden="true" className="relative mt-auto min-h-[200px] overflow-hidden rounded-[28px] border border-[#23362A] bg-[#16291E]">
            <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
              <path d="M0 60 L400 90 M0 140 L400 120 M120 0 L150 200 M280 0 L250 200" stroke="#23362A" strokeWidth="6" />
            </svg>
            <span className="animate-pulse-dot absolute left-[52%] top-[46%] size-[18px] rounded-full border-[3px] border-[#0D1B13] bg-[#C8F169]" />
            <span className="absolute bottom-4 left-4 text-[13px] text-[#C9D3C6]">{t('contacts.map')}</span>
          </div>
        </motion.div>

        {/* form card */}
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9 }}
          className="flex-[1.2_1_480px] rounded-[40px] bg-surface p-8 md:p-10">
          <AnimatePresence mode="wait">
            {!sentDept ? (
              <motion.form key="form" onSubmit={handleSubmit(onSubmit)} noValidate
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -12 }}
                className="flex flex-col gap-5">
                <h2 className="mb-1 font-display text-3xl font-medium tracking-[-0.03em]">{t('contacts.formTitle')}</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="c-name" label={t('contacts.fields.name')} error={errors.name?.message} {...register('name')} />
                  <Field id="c-surname" label={t('contacts.fields.surname')} {...register('surname')} />
                </div>
                <Field id="c-email" type="email" label={t('contacts.fields.email')} error={errors.email?.message} {...register('email')} />
                <fieldset>
                  <legend className="mb-2.5 text-sm font-medium">{t('contacts.fields.department')}</legend>
                  <Controller name="department" control={control} render={({ field }) => (
                    <ChipGroup label={t('contacts.fields.department')} options={deptOptions} value={field.value} onChange={field.onChange} />
                  )} />
                </fieldset>
                <Field id="c-subject" label={t('contacts.fields.subject')} {...register('subject')} />
                <Field id="c-message" textarea label={t('contacts.fields.message')} error={errors.message?.message} {...register('message')} />
                <button type="submit" disabled={isSubmitting}
                  className="btn-shine inline-flex h-[58px] items-center gap-3 self-start rounded-full bg-ink pl-7 pr-2.5 text-base font-medium text-bg disabled:opacity-60">
                  {isSubmitting ? t('contacts.sending') : t('contacts.send')}
                  <span className="flex size-10 items-center justify-center rounded-full bg-[#C8F169] text-[#0D1B13]">
                    {isSubmitting
                      ? <span className="size-4 animate-spin rounded-full border-2 border-[#0D1B13]/30 border-t-[#0D1B13]" />
                      : <Icon name="arrow" className="size-[17px]" strokeWidth={2} />}
                  </span>
                </button>
              </motion.form>
            ) : (
              <motion.div key="sent" role="status" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex min-h-[520px] flex-col items-center justify-center gap-5 text-center">
                <motion.span initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 12 }}
                  className="flex size-24 items-center justify-center rounded-full bg-[#C8F169] text-[#0D1B13]">
                  <Icon name="check" strokeWidth={2} className="size-11" />
                </motion.span>
                <motion.h2 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  className="font-display text-[32px] font-medium tracking-[-0.03em]">{t('contacts.sentTitle')}</motion.h2>
                <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="max-w-[340px] text-muted">{t('contacts.sentText', { dept: sentDept })}</motion.p>
                <motion.button type="button" onClick={() => setSentDept(null)}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
                  className="btn-shine h-12 rounded-full border border-line bg-surface px-6 text-[15px]">
                  {t('contacts.again')}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    </main>
  )
}