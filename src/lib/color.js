const toRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
const toHex = (rgb) => '#' + rgb.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')

export const mix = (a, b, t) => {
  const x = toRgb(a), y = toRgb(b)
  return toHex(x.map((v, i) => v + (y[i] - v) * t))
}

export const heroPalette = (tint) => ({
  sky: [mix(tint, '#ffffff', 0.85), mix(tint, '#ffffff', 0.45), tint],
  hills: [mix(tint, '#ffffff', 0.5), mix(tint, '#ffffff', 0.3), mix(tint, '#ffffff', 0.1), tint, mix(tint, '#000000', 0.3)],
})