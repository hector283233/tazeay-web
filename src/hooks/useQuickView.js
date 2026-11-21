import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

// Quick view lives in the address (?view=fish/zander-fillet) so the back button closes it
export function useQuickView() {
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const view = params.get('view')

  const write = (value, options) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value) next.set('view', value)
        else next.delete('view')
        return next
      },
      { preventScrollReset: true, ...options },
    )

  const keyOf = (product) => `${product.dept}/${product.slug}`

  return {
    view,
    open: (product) => write(keyOf(product), { state: { quickView: true } }),
    go: (product) => write(keyOf(product), { replace: true, state: location.state }),
    close: () => {
      if (location.state?.quickView) navigate(-1)
      else write(null, { replace: true })
    },
  }
}
