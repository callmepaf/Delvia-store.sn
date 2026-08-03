import { useState } from 'react'
import { formatCFA } from '../data/products'
import { useCart } from '../context/CartContext'
import LazyImage from './LazyImage'
import SizePickerModal from './SizePickerModal'

export default function ProductCard({ product, onView }) {
  const { addItem } = useCart()
  const [pickingSize, setPickingSize] = useState(false)
  const hasSizes = Boolean(product.sizes?.length)

  const handleAddClick = () => {
    if (hasSizes) {
      setPickingSize(true)
    } else {
      addItem(product)
    }
  }

  return (
    <div className="group relative flex flex-col">
      <button
        className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 text-left"
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
        <button className="text-left" onClick={() => onView(product)}>
          <h3 className="text-sm font-bold text-gray-900">
            {product.name} ({product.format})
          </h3>
        </button>
        <p className="mt-1 text-lg font-medium text-green-600">
          {hasSizes && <span className="text-xs text-gray-400 font-normal">dès </span>}
          {formatCFA(hasSizes ? product.sizes[0].price : product.price)}
        </p>
        <button
          className="mt-4 w-full bg-green-600 py-2 text-white text-sm font-bold rounded hover:bg-green-900 transition"
          onClick={handleAddClick}
        >
          Ajouter au panier
        </button>
      </div>

      {pickingSize && <SizePickerModal product={product} onClose={() => setPickingSize(false)} />}
    </div>
  )
}
