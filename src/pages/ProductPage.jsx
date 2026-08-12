import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useProducts, formatCFA } from '../data/products'
import { useCart } from '../context/CartContext'
import LazyImage from '../components/LazyImage'

export default function ProductPage() {
  const { id } = useParams()
  const { products, loading } = useProducts()
  const { addItem, openCart } = useCart()

  const product = products.find((p) => p.id === id)
  const hasMultipleSizes = (product?.sizes.length ?? 0) > 1

  const [selectedFormat, setSelectedFormat] = useState(null)
  const [qty, setQty] = useState(1)

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        {loading ? (
          <p className="text-sm text-gray-400">Chargement...</p>
        ) : (
          <>
            <p className="text-lg text-gray-600 mb-6">Produit introuvable.</p>
            <a
              href="/#produits"
              className="inline-block rounded bg-green-900 px-8 py-3 text-sm font-bold tracking-widest text-white transition hover:bg-green-600"
            >
              Voir nos produits
            </a>
          </>
        )}
      </div>
    )
  }

  const activeFormat = selectedFormat ?? product.sizes[0].format
  const selectedSize = product.sizes.find((size) => size.format === activeFormat) ?? product.sizes[0]

  const handleAdd = () => {
    addItem(
      {
        ...product,
        id: hasMultipleSizes ? `${product.id}-${selectedSize.format}` : product.id,
        format: selectedSize.format,
        price: selectedSize.price,
      },
      qty,
    )
    openCart()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <a href="/#produits" className="text-xs font-bold tracking-widest text-gray-400 hover:text-green-600 transition">
        ← RETOUR AUX PRODUITS
      </a>

      <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        <div className="bg-gray-50 rounded-2xl flex items-center justify-center p-8">
          <LazyImage
            src={product.image}
            alt={product.name}
            className="h-full w-full max-w-md"
            imgClassName="h-full w-full max-h-[28rem] object-contain drop-shadow-xl"
          />
        </div>

        <div>
          <span className="text-green-600 font-bold tracking-widest text-xs uppercase mb-2 block">
            Produit Naturel
          </span>
          <h1 className="text-3xl md:text-4xl font-serif italic text-gray-900 mb-4">
            {product.name}
            {!hasMultipleSizes && ` (${product.sizes[0].format})`}
          </h1>
          <p className="text-2xl font-medium text-green-900 mb-6">{formatCFA(selectedSize.price)}</p>

          <div className="space-y-4 text-gray-600 font-light mb-8">
            <p>{product.description}</p>
            <div className="flex items-center gap-3 text-sm">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600">
                ✓
              </span>
              <span>Pureté certifiée</span>
            </div>
          </div>

          {hasMultipleSizes && (
            <div className="mb-6">
              <span className="text-sm font-bold text-gray-700 mb-3 block">Format</span>
              <div className="space-y-3">
                {product.sizes.map((size) => (
                  <button
                    key={size.format}
                    onClick={() => setSelectedFormat(size.format)}
                    className={`w-full flex items-center justify-between rounded-lg border px-4 py-3 text-left transition ${
                      activeFormat === size.format
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                          activeFormat === size.format ? 'border-green-600' : 'border-gray-300'
                        }`}
                      >
                        {activeFormat === size.format && (
                          <span className="h-2 w-2 rounded-full bg-green-600" />
                        )}
                      </span>
                      <span className="font-medium text-gray-900">{size.format}</span>
                    </span>
                    <span className="font-bold text-green-600">{formatCFA(size.price)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-bold text-gray-700">Quantité</span>
            <div className="flex items-center border border-gray-200 rounded-lg">
              <button
                className="px-3 py-2 text-gray-600 hover:text-green-600"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="px-3 py-2 text-sm font-medium">{qty}</span>
              <button className="px-3 py-2 text-gray-600 hover:text-green-600" onClick={() => setQty((q) => q + 1)}>
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              className="w-full bg-green-600 text-white py-4 rounded-lg font-bold hover:bg-green-700 transition shadow-lg shadow-green-200"
              onClick={handleAdd}
            >
              AJOUTER AU PANIER — {formatCFA(selectedSize.price * qty)}
            </button>
            <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest">
              Commande et paiement via WhatsApp / Livraison partout au Sénégal
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
