import { useEffect, useState } from 'react'

const read = () => {
    try {
        return localStorage.getItem('theme') || 'light'
    } catch {
        return 'light'
    }
}

export function useTheme() {
    const [theme, setTheme] = useState(read)
    useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('theme', theme) } catch { /* storage unavailable (private mode) */ }
  }, [theme])
  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))]
}