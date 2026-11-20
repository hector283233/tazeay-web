// Pexels CDN link for a photo ID, resized to the width we need
export const px = (id, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`

export const heroPhoto = 1116440 // green rolling fields

export const pagePhotos = {
  about: 974314,  // green farmland
  news: 2255903,  // farmers' market stall
}

export const deptPhotos = {
  fish: 229789,
  'cattle-farm': 254178,
  sausages: 4639364,
  'semi-finished': 939052,
  poultry: 2223238,
  greenhouse: 2818573,
  feed: 33131,
  fruits: 1171170,
  dairy: 6341410,
  confectionery: 2536967,
  chocolate: 4110101,
  'ice-cream': 675439,
  coffee: 34079,
  snacks: 479628,
}

// a different photo per category where we have one
const catPhotos = {
  fish: { fresh: 229789, frozen: 17473, fillet: 8351649, smoked: 229789 },
  sausages: { boiled: 4639328, smoked: 4639364, franks: 26707587, deli: 5491277 },
  dairy: { milk: 5946742, kefir: 6341410, cottage: 248412, cheese: 248412 },
  chocolate: { chocolate: 4110101, sweets: 4110097, marmalade: 4113342 },
}

export const productPhoto = (p) => catPhotos[p.dept]?.[p.cat] ?? deptPhotos[p.dept]

export const newProductPhotos = { sokopay: 4110101, frumiks: 4110097, 'mi-mi': 4113342 }

export const galleryPhotos = {
  1: 2536967, 2: 4639328, 3: 939052, 4: 4639731, 5: 1385178,
  6: 3893776, 7: 3592423, 8: 5491277, 9: 3893527,
}