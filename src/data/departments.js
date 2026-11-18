const d = (slug, ru, en, catsRu, catsEn, tint, soft, icon) => ({
    slug, name: { ru, en, tm: '' }, cats: { ru: catsRu, en: catsEn, tm: '' }, tint, soft, icon,
})

export const departments = [
    d('fish', 'Рыба', 'Fish', 'Свежая · Замороженная · Филе', 'Fresh · Frozen · Fillet', '#24566F', '#E2EDF2', 'fish'),
    d('cattle-farm', 'Ферма КРС', 'Cattle farm', 'Говядина · Фарш', 'Beef · Mince', '#6B4F35', '#F0E9E1', 'farm'),
    d('sausages', 'Колбасы и мясные изделия', 'Sausages & meat', 'Варёные · Копчёные', 'Boiled · Smoked', '#8E2424', '#F5E4E4', 'sausage'),
    d('semi-finished', 'Полуфабрикаты', 'Quick meals', 'Пельмени · Манты', 'Dumplings · Manty', '#6A5A3C', '#F0ECE2', 'dumpling'),
    d('poultry', 'Куриная ферма', 'Poultry farm', 'Тушка · Филе · Яйца', 'Whole · Fillet · Eggs', '#8A5418', '#F6ECDD', 'egg'),
    d('greenhouse', 'Теплица', 'Greenhouse', 'Томаты · Огурцы', 'Tomatoes · Cucumbers', '#2F6B3A', '#E3F0E5', 'leaf'),
    d('feed', 'Корма', 'Animal feed', 'Для КРС · Для птицы', 'Cattle · Poultry', '#545A33', '#ECEFE1', 'sack'),
    d('fruits', 'Фрукты', 'Fruits', 'Сезонные · Сухофрукты', 'Seasonal · Dried', '#9A3F1A', '#F7E7DF', 'apple'),
]