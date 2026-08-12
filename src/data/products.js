import { useCallback, useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore/lite'
import { db } from '../firebase'
import superProteinVanilla from '../assets/products/super-protein-vanilla.webp'
import superProteinChocolate from '../assets/products/super-protein-chocolate.webp'
import superBoost from '../assets/products/super-boost.webp'
import superGreen from '../assets/products/super-green.webp'
import spiruline from '../assets/products/spiruline.webp'
import kombuchaAnanas from '../assets/products/kombucha-ananas.webp'
import kombuchaFraise from '../assets/products/kombucha-fraise.webp'
import granolaChocolat from '../assets/products/granola-chocolat.webp'

// Seed data — migrated into Firestore by scripts/seed-products.mjs. Kept here
// only as a fallback so the storefront still renders if Firestore is empty
// (e.g. before the first seed run).
export const seedProducts = [
  {
    id: 'super-protein-vanilla',
    name: 'Super Protein Vanille',
    image: superProteinVanilla,
    description:
      "Notre Super Protein dans une délicieuse version vanille, 100% naturelle, sans sucre ajouté ni arôme artificiel.",
    sizes: [
      { format: '250g', price: 25000 },
      { format: '500g', price: 45000 },
    ],
  },
  {
    id: 'super-protein-chocolate',
    name: 'Super Protein Chocolat',
    image: superProteinChocolate,
    description:
      "Notre Super Protein dans une gourmande version chocolat, 100% naturelle, sans sucre ajouté ni arôme artificiel.",
    sizes: [
      { format: '250g', price: 25000 },
      { format: '500g', price: 45000 },
    ],
  },
  {
    id: 'super-boost',
    name: 'Super Boost',
    image: superBoost,
    description:
      "Un concentré naturel de vitalité pour retrouver énergie et équilibre hormonal jour après jour.",
    sizes: [{ format: '100g', price: 15000 }],
  },
  {
    id: 'super-green',
    name: 'Super Green',
    image: superGreen,
    description:
      "Un mélange de super-aliments verts, riche en nutriments essentiels, pour purifier et revitaliser l'organisme.",
    sizes: [
      { format: '100g', price: 15000 },
      { format: '200g', price: 25000 },
    ],
  },
  {
    id: 'spiruline',
    name: 'Spiruline',
    image: spiruline,
    description:
      "Une spiruline pure et certifiée, source naturelle de fer et de protéines, pour renforcer votre vitalité.",
    sizes: [{ format: '100g', price: 12000 }],
  },
  {
    id: 'kombucha-ananas',
    name: 'Kombucha Ananas',
    image: kombuchaAnanas,
    description:
      "Notre kombucha artisanal infusé à l'ananas, légèrement pétillant et naturellement probiotique, pour une pause fraîcheur et digestion légère.",
    sizes: [{ format: 'Bouteille', price: 2500 }],
  },
  {
    id: 'kombucha-fraise',
    name: 'Kombucha Fraise',
    image: kombuchaFraise,
    description:
      "Notre kombucha artisanal infusé à la fraise, légèrement pétillant et naturellement probiotique, pour une pause fraîcheur et digestion légère.",
    sizes: [{ format: 'Bouteille', price: 2500 }],
  },
  {
    id: 'granola-chocolat',
    name: 'Granola Chocolat',
    image: granolaChocolat,
    description:
      "Notre granola gourmand au chocolat noir, riche en protéines, pour un petit-déjeuner énergisant et satiétant toute la matinée.",
    sizes: [{ format: '250g', price: 5000 }],
  },
]

export function useProducts() {
  const [products, setProducts] = useState(seedProducts)
  const [loading, setLoading] = useState(true)

  const refetch = useCallback(async () => {
    try {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'asc'))
      const snapshot = await getDocs(q)
      if (!snapshot.empty) {
        setProducts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { products, loading, refetch }
}

export const formatCFA = (amount) => `${amount.toLocaleString('fr-FR')} CFA`
