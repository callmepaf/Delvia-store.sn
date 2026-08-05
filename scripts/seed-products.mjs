// One-off migration: uploads the existing product photos to Firebase Storage
// and creates matching Firestore docs, so the admin panel's product list
// starts out matching what's already live on the site.
//
// Run once, after filling in .env.local (see .env.example):
//   node --env-file=.env.local scripts/seed-products.mjs

import { readFileSync } from 'node:fs'
import path from 'node:path'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore/lite'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

// Plain Node script — no import.meta.env here, so read process.env directly
// (populated via --env-file, unlike the Vite app which inlines VITE_ vars at build time).
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
}

if (!firebaseConfig.projectId) {
  console.error('Missing Firebase config — run with: node --env-file=.env.local scripts/seed-products.mjs')
  process.exit(1)
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

const assetsDir = path.resolve('src/assets/products')

const seedProducts = [
  {
    file: 'super-protein-vanilla.webp',
    name: 'Super Protein Vanille',
    description:
      "Notre Super Protein dans une délicieuse version vanille, 100% naturelle, sans sucre ajouté ni arôme artificiel.",
    sizes: [
      { format: '250g', price: 25000 },
      { format: '500g', price: 45000 },
    ],
  },
  {
    file: 'super-protein-chocolate.webp',
    name: 'Super Protein Chocolat',
    description:
      "Notre Super Protein dans une gourmande version chocolat, 100% naturelle, sans sucre ajouté ni arôme artificiel.",
    sizes: [
      { format: '250g', price: 25000 },
      { format: '500g', price: 45000 },
    ],
  },
  {
    file: 'super-boost.webp',
    name: 'Super Boost',
    description:
      "Un concentré naturel de vitalité pour retrouver énergie et équilibre hormonal jour après jour.",
    sizes: [{ format: '100g', price: 15000 }],
  },
  {
    file: 'super-green.webp',
    name: 'Super Green',
    description:
      "Un mélange de super-aliments verts, riche en nutriments essentiels, pour purifier et revitaliser l'organisme.",
    sizes: [
      { format: '100g', price: 15000 },
      { format: '200g', price: 25000 },
    ],
  },
  {
    file: 'spiruline.webp',
    name: 'Spiruline',
    description:
      "Une spiruline pure et certifiée, source naturelle de fer et de protéines, pour renforcer votre vitalité.",
    sizes: [{ format: '100g', price: 12000 }],
  },
]

for (const product of seedProducts) {
  const bytes = readFileSync(path.join(assetsDir, product.file))
  const imageRef = ref(storage, `products/${Date.now()}-${product.file}`)
  await uploadBytes(imageRef, bytes, { contentType: 'image/webp' })
  const image = await getDownloadURL(imageRef)

  await addDoc(collection(db, 'products'), {
    name: product.name,
    description: product.description,
    sizes: product.sizes,
    image,
    createdAt: serverTimestamp(),
  })

  console.log('seeded', product.name)
}

console.log('done')
