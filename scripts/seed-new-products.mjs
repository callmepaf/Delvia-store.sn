// One-off migration: uploads the 3 new product photos (kombucha ananas,
// kombucha fraise, granola chocolat) to Firebase Storage and creates
// matching Firestore docs, same as scripts/seed-products.mjs did for the
// original catalog. Safe to run once — re-running would create duplicates.
//
// Run once, after filling in .env.local (see .env.example):
//   node --env-file=.env.local scripts/seed-new-products.mjs

import { readFileSync } from 'node:fs'
import path from 'node:path'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore/lite'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
}

if (!firebaseConfig.projectId) {
  console.error('Missing Firebase config — run with: node --env-file=.env.local scripts/seed-new-products.mjs')
  process.exit(1)
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

const assetsDir = path.resolve('src/assets/products')

const newProducts = [
  {
    file: 'kombucha-ananas.webp',
    name: 'Kombucha Ananas',
    description:
      "Notre kombucha artisanal infusé à l'ananas, légèrement pétillant et naturellement probiotique, pour une pause fraîcheur et digestion légère.",
    sizes: [{ format: 'Bouteille', price: 2500 }],
  },
  {
    file: 'kombucha-fraise.webp',
    name: 'Kombucha Fraise',
    description:
      "Notre kombucha artisanal infusé à la fraise, légèrement pétillant et naturellement probiotique, pour une pause fraîcheur et digestion légère.",
    sizes: [{ format: 'Bouteille', price: 2500 }],
  },
  {
    file: 'granola-chocolat.webp',
    name: 'Granola Chocolat',
    description:
      "Notre granola gourmand au chocolat noir, riche en protéines, pour un petit-déjeuner énergisant et satiétant toute la matinée.",
    sizes: [{ format: '250g', price: 5000 }],
  },
]

for (const product of newProducts) {
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
