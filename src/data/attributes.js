// Mock product characteristics. Later they come from the backend (admin → Характеристики).
// Shape: [{ key, name, items: [{ key, name, value, unit, isKey }] }]
const t3 = (ru, en, tm) => ({ ru, en, tm })

const GROUPS = {
  nutrition: t3('Пищевая ценность на 100 г', 'Nutrition per 100 g', '100 g-daky iýmit gymmaty'),
  storage: t3('Хранение', 'Storage', 'Saklanyşy'),
  other: t3('Прочее', 'Other', 'Beýlekiler'),
}

const NAMES = {
  protein: t3('Белки', 'Protein', 'Beloklar'),
  fat: t3('Жиры', 'Fat', 'Ýaglar'),
  carbs: t3('Углеводы', 'Carbohydrates', 'Uglewodlar'),
  energy: t3('Энергия', 'Energy', 'Energiýa'),
  cocoa: t3('Какао', 'Cocoa', 'Kakao'),
  meat: t3('Мясо в составе', 'Meat content', 'Et mukdary'),
  kind: t3('Вид', 'Type', 'Görnüşi'),
  temp: t3('Температура', 'Temperature', 'Temperatura'),
  shelf: t3('Срок годности', 'Shelf life', 'Ýaramlylyk möhleti'),
  pack: t3('Упаковка', 'Packaging', 'Gaplama'),
  maker: t3('Производитель', 'Producer', 'Öndüriji'),
}

const UNITS = {
  g: t3('г', 'g', 'g'),
  kcal: t3('ккал', 'kcal', 'kkal'),
  pct: t3('%', '%', '%'),
}

const item = (key, value, unit = null, isKey = false) => ({ key, name: NAMES[key], value, unit, isKey })
const group = (key, items) => ({ key, name: GROUPS[key], items })

const nutrition = (protein, fat, carbs, energy) =>
  group('nutrition', [
    item('protein', protein, UNITS.g, true),
    item('fat', fat, UNITS.g, true),
    item('carbs', carbs, UNITS.g),
    item('energy', energy, UNITS.kcal, true),
  ])

const maker = item('maker', t3('Täze Aý, Туркменистан', 'Täze Aý, Turkmenistan', 'Täze Aý, Türkmenistan'))

const KINDS = {
  fresh: t3('Охлаждённое', 'Chilled', 'Sowadylan'),
  frozen: t3('Замороженное', 'Frozen', 'Doňdurylan'),
  fillet: t3('Замороженное', 'Frozen', 'Doňdurylan'),
  smoked: t3('Копчёное', 'Smoked', 'Kakadylan'),
}

const PROFILES = {
  fish: (p) => [
    nutrition(19, 1.1, 0, 84),
    group('storage', [
      item('kind', KINDS[p.cat] ?? KINDS.frozen),
      item('temp', p.cat === 'fresh' ? '0…+4 °C' : '−18 °C', null, true),
      item('shelf', p.cat === 'fresh' ? t3('5 суток', '5 days', '5 gün') : t3('12 месяцев', '12 months', '12 aý')),
    ]),
    group('other', [item('pack', t3('Вакуумная', 'Vacuum-packed', 'Wakuumly')), maker]),
  ],
  sausages: () => [
    nutrition(12, 22, 1.5, 257),
    group('storage', [
      item('temp', '0…+6 °C', null, true),
      item('shelf', t3('30 суток', '30 days', '30 gün')),
    ]),
    group('other', [item('meat', 85, UNITS.pct), item('pack', t3('Вакуумная', 'Vacuum-packed', 'Wakuumly')), maker]),
  ],
  dairy: () => [
    nutrition(3, 3.2, 4.7, 60),
    group('storage', [
      item('temp', '+2…+6 °C', null, true),
      item('shelf', t3('7 суток', '7 days', '7 gün')),
    ]),
    group('other', [item('pack', t3('Пакет', 'Carton', 'Paket')), maker]),
  ],
  chocolate: () => [
    nutrition(6, 31, 55, 520),
    group('storage', [
      item('temp', '+15…+21 °C', null, true),
      item('shelf', t3('12 месяцев', '12 months', '12 aý')),
    ]),
    group('other', [item('cocoa', 45, UNITS.pct), item('pack', t3('Обёртка', 'Wrapper', 'Örtük')), maker]),
  ],
}

export const attributesFor = (product) =>
  PROFILES[product.dept]?.(product) ?? [group('other', [maker])]
