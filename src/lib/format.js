export const weight = (code, t) => {
  const m = /^([\d.,]+)(g|kg|l|ml)$/.exec(code)
  return m ? `${m[1]} ${t(`units.${m[2]}`)}` : code
}