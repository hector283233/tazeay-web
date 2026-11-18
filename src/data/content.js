const t3 = (ru, en, tm = '') => ({ ru, en, tm })

export const factories = [
  { key: 'confectionery', name: t3('Кондитерский завод', 'Confectionery factory'), info: t3('+993 522 1 84 91', '+993 522 1 84 91') },
  { key: 'meat', name: t3('Мясо и колбасные изделия', 'Meat and sausages'), info: t3('+993 522 1 82 30', '+993 522 1 82 30') },
  { key: 'dairy', name: t3('Молочный завод', 'Dairy factory'), info: t3('г. Мары, ул. Сейди, 15', '15 Seydi St, Mary') },
  { key: 'f4', name: t3('[Название завода]', '[Factory name]', '[Zawodyň ady]'), info: t3('[контакт]', '[contact]', '[aragatnaşyk]') },
  { key: 'f5', name: t3('[Название завода]', '[Factory name]', '[Zawodyň ady]'), info: t3('[контакт]', '[contact]', '[aragatnaşyk]') },
]

export const certificates = [
  { key: 'halal', name: t3('Сертификат Халал', 'Halal certificate', 'Halal sertifikaty') },
  { key: 'c2', name: t3('[Сертификат]', '[Certificate]', '[Sertifikat]') },
  { key: 'c3', name: t3('[Сертификат]', '[Certificate]', '[Sertifikat]') },
  { key: 'c4', name: t3('[Сертификат]', '[Certificate]', '[Sertifikat]') },
]

// cat = department slug, so each photo takes that department's colours and name
export const gallery = [
  { id: 1, cat: 'confectionery', rows: 2, cols: 1 },
  { id: 2, cat: 'sausages', rows: 1, cols: 2 },
  { id: 3, cat: 'semi-finished', rows: 1, cols: 1 },
  { id: 4, cat: 'sausages', rows: 2, cols: 1 },
  { id: 5, cat: 'confectionery', rows: 1, cols: 1 },
  { id: 6, cat: 'semi-finished', rows: 2, cols: 1 },
  { id: 7, cat: 'confectionery', rows: 1, cols: 1 },
  { id: 8, cat: 'sausages', rows: 1, cols: 1 },
  { id: 9, cat: 'semi-finished', rows: 1, cols: 2 },
]

const placeholderNews = (n) => ({
  slug: `news-${n}`,
  tag: 'company',
  date: t3('[Дата]', '[Date]', '[Sene]'),
  title: t3('[Заголовок новости]', '[News title]', '[Täzeligiň ady]'),
  excerpt: t3('[Краткое описание новости]', '[Short news summary]', '[Gysgaça beýany]'),
  body: [t3('[Текст новости — добавляется в админ-панели.]', '[News text — added from the admin panel.]', '[Täzeligiň teksti — admin paneli arkaly goşulýar.]')],
})

export const news = [
  {
    slug: 'worldfood-moscow-2022',
    tag: 'exhibition',
    date: t3('20–23 сентября 2022 · Москва', '20–23 September 2022 · Moscow', '20–23-nji sentýabr 2022 · Moskwa'),
    title: t3('Täze Aý на выставке WorldFood Moscow 2022', 'Täze Aý at WorldFood Moscow 2022', 'Täze Aý WorldFood Moscow 2022 sergisinde'),
    excerpt: t3(
      'Компания представила свою продукцию на международной выставке продуктов питания в Москве.',
      'The company presented its products at the international food exhibition in Moscow.',
      'Kompaniýa öz önümlerini Moskwadaky halkara azyk sergisinde görkezdi.'),
    body: [
      t3('С 20 по 23 сентября 2022 года Täze Aý участвовала в международной выставке WorldFood Moscow.',
        'From 20 to 23 September 2022, Täze Aý took part in the WorldFood Moscow international exhibition.',
        '2022-nji ýylyň 20–23-nji sentýabry aralygynda Täze Aý WorldFood Moscow halkara sergisine gatnaşdy.'),
      t3('[Полный текст новости — добавляется в админ-панели.]', '[Full article text — added from the admin panel.]', '[Doly tekst — admin paneli arkaly goşulýar.]'),
    ],
  },
  placeholderNews(2),
  placeholderNews(3),
  placeholderNews(4),
  placeholderNews(5),
  placeholderNews(6),
  placeholderNews(7),
]