import superProteinVanilla from '../assets/products/super-protein-vanilla.webp'
import superProteinChocolate from '../assets/products/super-protein-chocolate.webp'
import superBoost from '../assets/products/super-boost.webp'
import superGreen from '../assets/products/super-green.webp'
import spiruline from '../assets/products/spiruline.webp'

export const products = [
  {
    id: 'super-protein-vanilla',
    name: 'Super Protein Vanille',
    format: '100g',
    price: 25000,
    image: superProteinVanilla,
    description:
      "Notre Super Protein dans une délicieuse version vanille, 100% naturelle, sans sucre ajouté ni arôme artificiel.",
  },
  {
    id: 'super-protein-chocolate',
    name: 'Super Protein Chocolat',
    format: '100g',
    price: 25000,
    image: superProteinChocolate,
    description:
      "Notre Super Protein dans une gourmande version chocolat, 100% naturelle, sans sucre ajouté ni arôme artificiel.",
  },
  {
    id: 'super-boost',
    name: 'Super Boost',
    format: '100g',
    price: 15000,
    image: superBoost,
    description:
      "Un concentré naturel de vitalité pour retrouver énergie et équilibre hormonal jour après jour.",
  },
  {
    id: 'super-green',
    name: 'Super Green',
    format: '200g',
    price: 25000,
    image: superGreen,
    description:
      "Un mélange de super-aliments verts, riche en nutriments essentiels, pour purifier et revitaliser l'organisme.",
  },
  {
    id: 'spiruline',
    name: 'Spiruline',
    format: '100g',
    price: 12000,
    image: spiruline,
    description:
      "Une spiruline pure et certifiée, source naturelle de fer et de protéines, pour renforcer votre vitalité.",
  },
]

export const formatCFA = (amount) => `${amount.toLocaleString('fr-FR')} CFA`
