import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatCFA } from '../data/products'
import { useCart } from '../context/CartContext'
import LazyImage from './LazyImage'
import SizePickerModal from './SizePickerModal'
import Button from './ui/Button'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const [pickingSize, setPickingSize] = useState(false)
  const hasMultipleSizes = product.sizes.length > 1
  const defaultSize = product.sizes[0]

  const handleAddClick = () => {
    if (hasMultipleSizes) {
      setPickingSize(true)
    } else {
      addItem({ ...product, format: defaultSize.format, price: defaultSize.price })
    }
  }

  return (
    <div className="group relative flex flex-col">
      <Link
        to={`/produits/${product.id}`}
        className="aspect-square w-full overflow-hidden rounded-md bg-secondary block outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <LazyImage
          src={product.image}
          alt={product.name}
          className="h-full w-full"
          imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="mt-4 flex flex-col grow">
        <Link
          to={`/produits/${product.id}`}
          className="text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50 rounded"
        >
          <h3 className="text-sm font-medium text-foreground">
            {product.name} ({defaultSize.format})
          </h3>
        </Link>
        <p className="mt-1 font-mono text-sm text-foreground">
          {hasMultipleSizes && <span className="text-xs text-muted-foreground">dès </span>}
          {formatCFA(defaultSize.price)}
        </p>
        <Button className="mt-4 w-full h-10" onClick={handleAddClick}>
          Ajouter au panier
        </Button>
      </div>

      {pickingSize && <SizePickerModal product={product} onClose={() => setPickingSize(false)} />}
    </div>
  )
}
