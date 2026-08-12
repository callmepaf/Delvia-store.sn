import { useState } from 'react'
import { formatCFA } from '../data/products'
import { useCart } from '../context/CartContext'
import Button from './ui/Button'

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
      className="fixed inset-0 z-110 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-card w-full max-w-sm rounded-lg shadow-lg border border-border relative p-8">
        <button
          className="absolute top-4 right-4 rounded-full p-2 bg-background/80 hover:bg-secondary transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          onClick={onClose}
          aria-label="Fermer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-center gap-4 mb-6">
          <img src={product.image} alt={product.name} className="h-14 w-14 rounded-md object-cover bg-secondary" />
          <div>
            <h3 className="text-base font-medium text-foreground">{product.name}</h3>
            <p className="label-mono text-muted-foreground">Choisissez un format</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {product.sizes.map((size) => (
            <button
              key={size.format}
              onClick={() => setSelectedFormat(size.format)}
              className={`w-full flex items-center justify-between rounded-md border px-4 py-3 text-left transition ${
                selectedFormat === size.format
                  ? 'border-foreground bg-secondary'
                  : 'border-border hover:border-foreground/40'
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                    selectedFormat === size.format ? 'border-foreground' : 'border-border'
                  }`}
                >
                  {selectedFormat === size.format && <span className="h-2 w-2 rounded-full bg-foreground" />}
                </span>
                <span className="font-medium text-foreground">{size.format}</span>
              </span>
              <span className="font-mono text-sm text-foreground">{formatCFA(size.price)}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-medium text-foreground">Quantité</span>
          <div className="flex items-center border border-border rounded-md">
            <button
              className="px-3 py-2 text-muted-foreground hover:text-foreground"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <span className="px-3 py-2 font-mono text-sm text-foreground">{qty}</span>
            <button className="px-3 py-2 text-muted-foreground hover:text-foreground" onClick={() => setQty((q) => q + 1)}>
              +
            </button>
          </div>
        </div>

        <Button className="w-full h-11" onClick={handleAdd}>
          Ajouter au panier — <span className="font-mono">{formatCFA(selectedSize.price * qty)}</span>
        </Button>
      </div>
    </div>
  )
}
