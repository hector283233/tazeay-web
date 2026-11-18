const p = (dept, cat, slug, ru, en, weights, extra = {}) => ({
  dept, cat, slug, weights, name: { ru, en, tm: '' }, ...extra,
})

export const products = [
  // Fish (sample)
  p('fish', 'fresh', 'carp-fresh', 'Сазан свежий', 'Fresh carp', ['1kg'], { hit: true }),
  p('fish', 'fresh', 'silver-carp-fresh', 'Толстолобик свежий', 'Fresh silver carp', ['1kg']),
  p('fish', 'frozen', 'zander-frozen', 'Судак замороженный', 'Frozen zander', ['1kg']),
  p('fish', 'frozen', 'mackerel-frozen', 'Скумбрия замороженная', 'Frozen mackerel', ['500g']),
  p('fish', 'fillet', 'zander-fillet', 'Филе судака', 'Zander fillet', ['300g', '500g', '1kg'], { hit: true }),
  p('fish', 'fillet', 'silver-carp-fillet', 'Филе толстолобика', 'Silver carp fillet', ['500g']),
  p('fish', 'smoked', 'mackerel-cold-smoked', 'Скумбрия холодного копчения', 'Cold-smoked mackerel', ['300g'], { hit: true }),
  p('fish', 'smoked', 'carp-hot-smoked', 'Сазан горячего копчения', 'Hot-smoked carp', ['400g']),
  // Sausages (sample)
  p('sausages', 'boiled', 'doktorskaya', 'Колбаса варёная «Докторская»', 'Doktorskaya boiled sausage', ['500g'], { hit: true }),
  p('sausages', 'boiled', 'milk-sausage', 'Колбаса молочная', 'Milk sausage', ['500g']),
  p('sausages', 'smoked', 'servelat', 'Сервелат', 'Cervelat', ['350g'], { hit: true }),
  p('sausages', 'smoked', 'dry-smoked', 'Колбаса сырокопчёная', 'Dry-cured sausage', ['300g']),
  p('sausages', 'franks', 'milk-franks', 'Сосиски молочные', 'Milk franks', ['400g']),
  p('sausages', 'franks', 'sardelki', 'Сардельки', 'Sardelki', ['500g']),
  p('sausages', 'deli', 'basturma', 'Бастурма', 'Basturma', ['200g'], { hit: true }),
  p('sausages', 'deli', 'kazy', 'Казы', 'Kazy', ['300g']),
  // Dairy (sample)
  p('dairy', 'milk', 'milk-3-2', 'Молоко 3,2%', 'Milk 3.2%', ['1l'], { hit: true }),
  p('dairy', 'milk', 'milk-2-5', 'Молоко 2,5%', 'Milk 2.5%', ['1l']),
  p('dairy', 'kefir', 'kefir-2-5', 'Кефир 2,5%', 'Kefir 2.5%', ['1l'], { hit: true }),
  p('dairy', 'kefir', 'kefir-1', 'Кефир 1%', 'Kefir 1%', ['0,5l']),
  p('dairy', 'cottage', 'cottage-9', 'Творог 9%', 'Cottage cheese 9%', ['200g']),
  p('dairy', 'cottage', 'cottage-5', 'Творог 5%', 'Cottage cheese 5%', ['400g']),
  p('dairy', 'cheese', 'brynza', 'Брынза', 'Brynza', ['300g'], { hit: true }),
  p('dairy', 'cheese', 'suluguni', 'Сулугуни', 'Suluguni', ['300g']),
  // Chocolate (real new products from tazeay.com)
  p('chocolate', 'chocolate', 'sokopay', 'SokoPay', 'SokoPay', [], { isNew: true }),
  p('chocolate', 'sweets', 'frumiks', 'Frumiks', 'Frumiks', [], { isNew: true }),
  p('chocolate', 'marmalade', 'mi-mi', 'Mi-Mi', 'Mi-Mi', [], { isNew: true }),
]