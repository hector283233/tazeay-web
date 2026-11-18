import { Link, useParams, useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()
  const { lang = 'ru' } = useParams()
  console.error(error)
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-bg px-6 text-center text-ink">
      <span className="font-display text-7xl font-medium tracking-tight text-primary">Oops</span>
      <p className="max-w-md text-muted">Что-то пошло не так. Попробуйте обновить страницу. · Something went wrong. Please reload the page.</p>
      <div className="flex gap-3">
        <button type="button" onClick={() => window.location.reload()}
          className="h-12 rounded-full bg-ink px-6 font-medium text-bg">Обновить · Reload</button>
        <Link to={`/${lang}`} className="flex h-12 items-center rounded-full border border-line px-6 font-medium">Täze Aý</Link>
      </div>
    </main>
  )
}