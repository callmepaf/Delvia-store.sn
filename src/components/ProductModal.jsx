import { useState } from 'react'
import { formatCFA } from '../data/products'
import { useCart } from '../context/CartContext'
import LazyImage from './LazyImage'
import SizePickerModal from './SizePickerModal'

export default function ProductModal({ product, onClose }) {
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [pickingSize, setPickingSize] = useState(false)

  if (!product) return null

  const hasSizes = Boolean(product.sizes?.length)

  const handleAdd = () => {
    if (hasSizes) {
      setPickingSize(true)
      return
    }
    addItem(product, qty)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative flex flex-col md:flex-row">
        <button
          className="absolute top-4 right-4 z-10 bg-white/80 rounded-full p-2 hover:bg-gray-200 transition"
          onClick={onClose}
          aria-label="Fermer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8">
          <LazyImage
            src={product.image}
            alt={product.name}
            className="h-full w-full"
            imgClassName="h-full w-full max-h-full object-contain drop-shadow-xl"
          />
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <span className="text-green-600 font-bold tracking-widest text-xs uppercase mb-2">Produit Naturel</span>
          <h2 className="text-3xl font-serif italic text-gray-900 mb-4">
            {product.name}{!hasSizes && ` (${product.format})`}
          </h2>
          <p className="text-2xl font-medium text-green-900 mb-6">
            {hasSizes && <span className="text-sm text-gray-400 font-normal">dès </span>}
            {formatCFA(hasSizes ? product.sizes[0].price : product.price)}
          </p>

          <div className="space-y-4 text-gray-600 font-light mb-8">
            <p>{product.description}</p>
            <div className="flex items-center gap-3 text-sm">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600">✓</span>
              <span>Pureté certifiée</span>
            </div>
          </div>

          {!hasSizes && (
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
          )}

          <div className="flex flex-col gap-3">
            <button
              className="w-full bg-green-600 text-white py-4 rounded-lg font-bold hover:bg-green-700 transition shadow-lg shadow-green-200"
              onClick={handleAdd}
            >
              {hasSizes ? 'CHOISIR UN FORMAT' : 'AJOUTER AU PANIER'}
            </button>
            <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest">
              Commande et paiement via WhatsApp / Livraison partout au Sénégal
            </p>
          </div>
        </div>
      </div>

      {pickingSize && (
        <SizePickerModal product={product} onClose={() => setPickingSize(false)} onAdded={onClose} />
      )}
    </div>
  )
}
