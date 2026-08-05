import { useState } from 'react'
import { formatCFA } from '../data/products'
import { useCart } from '../context/CartContext'
import LazyImage from './LazyImage'
import SizePickerModal from './SizePickerModal'

export default function ProductCard({ product, onView }) {
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
      <button
        className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 text-left outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
        onClick={() => onView(product)}
      >
        <LazyImage
          src={product.image}
          alt={product.name}
          className="h-full w-full"
          imgClassName="h-full w-full object-cover transition group-hover:scale-105"
        />
      </button>
      <div className="mt-4 flex flex-col grow">
        <button
          className="text-left outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded"
          onClick={() => onView(product)}
        >
          <h3 className="text-sm font-bold text-gray-900">
            {product.name} ({defaultSize.format})
          </h3>
        </button>
        <p className="mt-1 text-lg font-medium text-green-600">
          {hasMultipleSizes && <span className="text-xs text-gray-400 font-normal">dès </span>}
          {formatCFA(defaultSize.price)}
        </p>
        <button
          className="mt-4 w-full bg-green-600 py-2 text-white text-sm font-bold rounded hover:bg-green-900 transition outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
          onClick={handleAddClick}
        >
          Ajouter au panier
        </button>
      </div>

      {pickingSize && <SizePickerModal product={product} onClose={() => setPickingSize(false)} />}
    </div>
  )
}
