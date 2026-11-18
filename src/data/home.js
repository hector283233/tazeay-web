export const stats = [
  { key: 'products', value: 200, suffix: '+' },
  { key: 'factories', value: 5 },
  { key: 'jobs', value: 1705 },
  { key: 'departments', value: 14 },
]

export const newProducts = [
  { slug: 'sokopay', name: 'SokoPay', dept: { ru: 'Шоколад и конфеты', en: 'Chocolate & sweets', tm: '' }, bg: '#F1E8E4', tint: '#5A3427', icon: 'candy' },
  { slug: 'frumiks', name: 'Frumiks', dept: { ru: 'Шоколад и конфеты', en: 'Chocolate & sweets', tm: '' }, bg: '#F7E7DF', tint: '#9A3F1A', icon: 'candy' },
  { slug: 'mi-mi', name: 'Mi-Mi', dept: { ru: 'Мармелад', en: 'Marmalade', tm: '' }, bg: '#F3E5EC', tint: '#7A3E5C', icon: 'candy' },
]

export const principles = [
  { key: 'raw', n: '01', bg: '#FFFFFF', fg: '#0D1B13', line: '#DEE0D8', icon: 'leaf' },
  { key: 'new', n: '02', bg: '#C8F169', fg: '#0D1B13', line: '#B6DE58', icon: 'star' },
  { key: 'pack', n: '03', bg: '#0D1B13', fg: '#EEF2EA', line: '#0D1B13', icon: 'box' },
  { key: 'team', n: '04', bg: '#E3F0E5', fg: '#0D1B13', line: '#D0E4D3', icon: 'team' },
]

const placeholder = (slug) => ({
  slug,
  date: { ru: '[Дата]', en: '[Date]', tm: '[Sene]' },
  title: { ru: '[Заголовок новости]', en: '[News title]', tm: '[Täzeligiň ady]' },
  tag: { ru: '[Тема]', en: '[Topic]', tm: '[Tema]' },
})

export const latestNews = [
  {
    slug: 'worldfood-moscow-2022',
    date: { ru: '20–23 сентября 2022', en: '20–23 September 2022', tm: '' },
    title: { ru: 'Täze Aý на выставке WorldFood Moscow 2022', en: 'Täze Aý at WorldFood Moscow 2022', tm: '' },
    tag: { ru: 'Выставка', en: 'Exhibition', tm: 'Sergi' },
  },
  placeholder('news-2'),
  placeholder('news-3'),
]