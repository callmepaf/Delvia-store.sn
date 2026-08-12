import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useProducts, formatCFA } from '../data/products'
import { useCart } from '../context/CartContext'
import LazyImage from '../components/LazyImage'
import Button, { buttonClasses } from '../components/ui/Button'

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24 text-center">
        {loading ? (
          <p className="text-sm text-muted-foreground">Chargement...</p>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-6">Produit introuvable.</p>
            <a href="/#produits" className={buttonClasses({ className: 'h-11 px-6' })}>
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <a href="/#produits" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
        ← Retour aux produits
      </a>

      <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary flex items-center justify-center p-8">
          <LazyImage
            src={product.image}
            alt={product.name}
            className="h-full w-full"
            imgClassName="h-full w-full max-h-[28rem] object-contain"
          />
        </div>

        <div>
          <p className="label-mono text-muted-foreground mb-2">Produit naturel</p>
          <h1 className="text-3xl md:text-4xl font-display italic font-normal tracking-[-0.01em] text-foreground mb-4 text-balance">
            {product.name}
            {!hasMultipleSizes && ` (${product.sizes[0].format})`}
          </h1>
          <p className="font-mono text-lg text-foreground mb-6">{formatCFA(selectedSize.price)}</p>

          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground text-pretty mb-8">
            <p>{product.description}</p>
            <div className="flex items-center gap-3 text-sm text-foreground">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground">
                ✓
              </span>
              <span>Pureté certifiée</span>
            </div>
          </div>

          {hasMultipleSizes && (
            <div className="mb-6">
              <span className="text-sm font-medium text-foreground mb-3 block">Format</span>
              <div className="space-y-3">
                {product.sizes.map((size) => (
                  <button
                    key={size.format}
                    onClick={() => setSelectedFormat(size.format)}
                    className={`w-full flex items-center justify-between rounded-md border px-4 py-3 text-left transition ${
                      activeFormat === size.format
                        ? 'border-foreground bg-secondary'
                        : 'border-border hover:border-foreground/40'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                          activeFormat === size.format ? 'border-foreground' : 'border-border'
                        }`}
                      >
                        {activeFormat === size.format && <span className="h-2 w-2 rounded-full bg-foreground" />}
                      </span>
                      <span className="font-medium text-foreground">{size.format}</span>
                    </span>
                    <span className="font-mono text-sm text-foreground">{formatCFA(size.price)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-medium text-foreground">Quantité</span>
            <div className="flex items-center border border-border rounded-md">
              <button
                className="px-3 py-2 text-muted-foreground hover:text-foreground"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="px-3 py-2 font-mono text-sm text-foreground">{qty}</span>
              <button
                className="px-3 py-2 text-muted-foreground hover:text-foreground"
                onClick={() => setQty((q) => q + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button className="w-full h-11" onClick={handleAdd}>
              Ajouter au panier — <span className="font-mono">{formatCFA(selectedSize.price * qty)}</span>
            </Button>
            <p className="label-mono text-center text-muted-foreground">
              Commande et paiement via WhatsApp / Livraison partout au Sénégal
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
