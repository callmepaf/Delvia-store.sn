import { useState } from 'react'
import { formatCFA } from '../data/products'
import { useCart } from '../context/CartContext'

export default function SizePickerModal({ product, onClose, onAdded }) {
  const { addItem } = useCart()
  const [selectedFormat, setSelectedFormat] = useState(product.sizes[0].format)
  const [qty, setQty] = useState(1)

  const selectedSize = product.sizes.find((size) => size.format === selectedFormat)

  const handleAdd = () => {
    addItem(
      {
        ...product,
        id: `${product.id}-${selectedSize.format}`,
        format: selectedSize.format,
        price: selectedSize.price,
      },
      qty,
    )
    onAdded?.()
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl relative p-8">
        <button
          className="absolute top-4 right-4 bg-white/80 rounded-full p-2 hover:bg-gray-200 transition"
          onClick={onClose}
          aria-label="Fermer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-center gap-4 mb-6">
          <img src={product.image} alt={product.name} className="h-16 w-16 rounded-lg object-cover bg-gray-100" />
          <div>
            <h3 className="font-serif italic text-lg text-gray-900">{product.name}</h3>
            <p className="text-xs text-gray-400 uppercase tracking-widest">Choisissez un format</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {product.sizes.map((size) => (
            <button
              key={size.format}
              onClick={() => setSelectedFormat(size.format)}
              className={`w-full flex items-center justify-between rounded-lg border px-4 py-3 text-left transition ${
                selectedFormat === size.format
                  ? 'border-green-600 bg-green-50'
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                    selectedFormat === size.format ? 'border-green-600' : 'border-gray-300'
                  }`}
                >
                  {selectedFormat === size.format && <span className="h-2 w-2 rounded-full bg-green-600" />}
                </span>
                <span className="font-medium text-gray-900">{size.format}</span>
              </span>
              <span className="font-bold text-green-600">{formatCFA(size.price)}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
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

        <button
          className="w-full bg-green-600 text-white py-4 rounded-lg font-bold hover:bg-green-700 transition shadow-lg shadow-green-200"
          onClick={handleAdd}
        >
          AJOUTER AU PANIER — {formatCFA(selectedSize.price * qty)}
        </button>
      </div>
    </div>
  )
}
