const c = (key, ru, en, tm) => ({ key, name: { ru, en, tm } })

const d = ({ slug, ru, en, tm, tagRu, tagEn, tagTm, tint, soft, icon, phone = null, cats }) => ({
  slug, tint, soft, icon, phone,
  name: { ru, en, tm },
  tagline: { ru: tagRu, en: tagEn, tm: tagTm },
  categories: cats,
  cats: {
    ru: cats.slice(0, 3).map((x) => x.name.ru).join(' · '),
    en: cats.slice(0, 3).map((x) => x.name.en).join(' · '),
    tm: cats.slice(0, 3).map((x) => x.name.tm).join(' · '),
  },
})

export const departments = [
  d({ slug: 'fish', ru: 'Рыба', en: 'Fish', tm: 'Balyk', tint: '#24566F', soft: '#E2EDF2', icon: 'fish',
    tagRu: 'Свежая, замороженная и копчёная рыба — от улова до вашего стола.',
    tagEn: 'Fresh, frozen and smoked fish — from the catch to your table.',
    tagTm: 'Täze, doňdurylan we kakadylan balyk — awdan saçagyňyza çenli.',
    cats: [c('fresh', 'Свежая', 'Fresh', 'Täze'), c('frozen', 'Замороженная', 'Frozen', 'Doňdurylan'),
      c('fillet', 'Филе', 'Fillet', 'File'), c('smoked', 'Копчёная', 'Smoked', 'Kakadylan')] }),

  d({ slug: 'cattle-farm', ru: 'Ферма КРС', en: 'Cattle farm', tm: 'Iri şahly mal fermasy', tint: '#6B4F35', soft: '#F0E9E1', icon: 'farm',
    tagRu: 'Говядина и мясо крупного рогатого скота.',
    tagEn: 'Beef and cattle meat.',
    tagTm: 'Sygyr eti we iri şahly mallaryň eti.',
    cats: [c('beef', 'Говядина', 'Beef', 'Sygyr eti'), c('mince', 'Фарш', 'Mince', 'Gyýma'),
      c('offal', 'Субпродукты', 'Offal', 'Içalyk')] }),

  d({ slug: 'sausages', ru: 'Колбасы и мясные изделия', en: 'Sausages & meat', tm: 'Kolbasalar we et önümleri', tint: '#8E2424', soft: '#F5E4E4', icon: 'sausage', phone: '+993 522 1 82 30',
    tagRu: 'Варёные и копчёные колбасы, сосиски и мясные деликатесы.',
    tagEn: 'Boiled and smoked sausages, franks and meat delicacies.',
    tagTm: 'Gaýnadylan we kakadylan kolbasalar, sosiskalar we et naz-nygmatlary.',
    cats: [c('boiled', 'Варёные', 'Boiled', 'Gaýnadylan'), c('smoked', 'Копчёные', 'Smoked', 'Kakadylan'),
      c('franks', 'Сосиски', 'Franks', 'Sosiskalar'), c('deli', 'Деликатесы', 'Delicacies', 'Naz-nygmatlar')] }),

  d({ slug: 'semi-finished', ru: 'Полуфабрикаты', en: 'Quick meals', tm: 'Ýarymfabrikatlar', tint: '#6A5A3C', soft: '#F0ECE2', icon: 'dumpling',
    tagRu: 'Пельмени, манты и котлеты — быстрые и вкусные блюда.',
    tagEn: 'Dumplings, manty and cutlets — quick, tasty meals.',
    tagTm: 'Börek, manty we kotletler — çalt we tagamly naharlar.',
    cats: [c('dumplings', 'Пельмени', 'Dumplings', 'Börek'), c('manty', 'Манты', 'Manty', 'Manty'),
      c('cutlets', 'Котлеты', 'Cutlets', 'Kotletler')] }),

  d({ slug: 'poultry', ru: 'Куриная ферма', en: 'Poultry farm', tm: 'Towuk fermasy', tint: '#8A5418', soft: '#F6ECDD', icon: 'egg',
    tagRu: 'Мясо птицы и свежие яйца.',
    tagEn: 'Poultry meat and fresh eggs.',
    tagTm: 'Guş eti we täze ýumurtga.',
    cats: [c('whole', 'Тушка', 'Whole bird', 'Bitin towuk'), c('fillet', 'Филе', 'Fillet', 'File'),
      c('eggs', 'Яйца', 'Eggs', 'Ýumurtga')] }),

  d({ slug: 'greenhouse', ru: 'Теплица', en: 'Greenhouse', tm: 'Ýyladyşhana', tint: '#2F6B3A', soft: '#E3F0E5', icon: 'leaf',
    tagRu: 'Овощи и зелень круглый год.',
    tagEn: 'Vegetables and greens all year round.',
    tagTm: 'Ýylyň dowamynda gök önümler we ýaşyllyklar.',
    cats: [c('tomatoes', 'Томаты', 'Tomatoes', 'Pomidor'), c('cucumbers', 'Огурцы', 'Cucumbers', 'Hyýar'),
      c('greens', 'Зелень', 'Greens', 'Ýaşyllyklar')] }),

  d({ slug: 'feed', ru: 'Корма', en: 'Animal feed', tm: 'Iýmler', tint: '#545A33', soft: '#ECEFE1', icon: 'sack',
    tagRu: 'Корма для скота и птицы.',
    tagEn: 'Feed for cattle and poultry.',
    tagTm: 'Mallar we guşlar üçin iýmler.',
    cats: [c('cattle', 'Для КРС', 'For cattle', 'Iri şahly mallar üçin'), c('poultry', 'Для птицы', 'For poultry', 'Guşlar üçin')] }),

  d({ slug: 'fruits', ru: 'Фрукты', en: 'Fruits', tm: 'Miweler', tint: '#9A3F1A', soft: '#F7E7DF', icon: 'apple',
    tagRu: 'Сезонные местные фрукты и сухофрукты.',
    tagEn: 'Seasonal local fruit and dried fruit.',
    tagTm: 'Möwsümleýin ýerli miweler we kak miweler.',
    cats: [c('seasonal', 'Сезонные', 'Seasonal', 'Möwsümleýin'), c('dried', 'Сухофрукты', 'Dried fruit', 'Kak miweler')] }),

]