import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'delvia-cart'

function readStoredCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart)
  const [isOpen, setIsOpen] = useState(false)

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (product, qty = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item,
        )
      }
      return [...current, { ...product, qty }]
    })
  }

  const removeItem = (id) => {
    setItems((current) => current.filter((item) => item.id !== id))
  }

  const setQty = (id, qty) => {
    if (qty < 1) return
    setItems((current) => current.map((item) => (item.id === id ? { ...item, qty } : item)))
  }

  const clearCart = () => setItems([])

  const count = useMemo(() => items.reduce((sum, item) => sum + item.qty, 0), [items])
  const total = useMemo(() => items.reduce((sum, item) => sum + item.qty * item.price, 0), [items])

  const value = { items, addItem, removeItem, setQty, clearCart, count, total, isOpen, openCart, closeCart }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
