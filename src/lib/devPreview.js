import { useSyncExternalStore } from 'react'

// Development-only overrides for the design switcher. Ignored in the production build.
const KEY = 'dev-preview'
const EMPTY = {}
const listeners = new Set()

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || EMPTY
  } catch {
    return EMPTY
  }
}

let state = read()

export function setDevPreview(patch) {
  state = { ...state, ...patch }
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* storage unavailable (private mode) */
  }
  listeners.forEach((listener) => listener())
}

const subscribe = (listener) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const snapshot = () => (import.meta.env.DEV ? state : EMPTY)

export const useDevPreview = () => useSyncExternalStore(subscribe, snapshot)
