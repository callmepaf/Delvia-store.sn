import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { formatCFA } from '../data/products'
import { buildOrderMessage, buildWhatsAppLink } from '../utils/whatsapp'
import Button, { buttonClasses } from './ui/Button'

export default function CartModal() {
  const { items, removeItem, setQty, total, clearCart, isOpen, closeCart } = useCart()
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '' })
  const [orderSent, setOrderSent] = useState(false)

  if (!isOpen) return null

  const handleChange = (field) => (e) => setCustomer((c) => ({ ...c, [field]: e.target.value }))

  const handleOrder = () => {
    const message = buildOrderMessage({ items, total, customer })
    window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer')
    setOrderSent(true)
  }

  const handleClose = () => {
    closeCart()
    if (orderSent) {
      clearCart()
      setCustomer({ name: '', phone: '', address: '' })
      setOrderSent(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="bg-card w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg relative border border-border">
        <button
          className="absolute top-4 right-4 z-10 rounded-full p-2 bg-background/80 hover:bg-secondary transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          onClick={handleClose}
          aria-label="Fermer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {orderSent ? (
          <div className="flex flex-col items-center justify-center text-center px-8 py-20">
            <div className="flex size-14 items-center justify-center rounded-full bg-accent mb-6">
              <svg className="h-8 w-8" viewBox="0 0 52 52">
                <circle
                  className="checkmark-circle"
                  cx="26"
                  cy="26"
                  r="24"
                  fill="none"
                  stroke="var(--accent-foreground)"
                  strokeWidth="3"
                />
                <path
                  className="checkmark-check"
                  fill="none"
                  stroke="var(--accent-foreground)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 27l7 7 17-17"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-display italic font-normal tracking-[-0.01em] text-foreground mb-3">
              Commande envoyée !
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty max-w-sm mb-8">
              Votre commande a été transmise, vous serez livré dans les 24h.
            </p>
            <button onClick={handleClose} className={buttonClasses({ className: 'h-11 px-10' })}>
              Fermer
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center px-8 py-20">
            <h2 className="text-3xl font-display italic font-normal tracking-[-0.01em] text-foreground mb-4">
              Votre panier est vide
            </h2>
            <p className="text-sm text-muted-foreground mb-8">
              Découvrez nos produits naturels et ajoutez-les à votre panier.
            </p>
            <button onClick={closeCart} className={buttonClasses({ className: 'h-11 px-8' })}>
              Voir les produits
            </button>
          </div>
        ) : (
          <div className="p-6 md:p-10">
            <h2 className="text-3xl font-display italic font-normal tracking-[-0.01em] text-foreground mb-8 text-center">
              Votre panier
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10">
              <div className="lg:col-span-1 space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 border-b border-border pb-6">
                    <img src={item.image} alt={item.name} className="h-16 w-16 rounded-md object-cover bg-secondary" />
                    <div className="grow">
                      <h3 className="text-sm font-medium text-foreground">
                        {item.name} ({item.format})
                      </h3>
                      <p className="font-mono text-sm text-muted-foreground">{formatCFA(item.price)}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-border rounded-md">
                          <button
                            className="px-3 py-1 text-muted-foreground hover:text-foreground"
                            onClick={() => setQty(item.id, item.qty - 1)}
                          >
                            −
                          </button>
                          <span className="px-3 py-1 font-mono text-sm text-foreground">{item.qty}</span>
                          <button
                            className="px-3 py-1 text-muted-foreground hover:text-foreground"
                            onClick={() => setQty(item.id, item.qty + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="text-xs text-muted-foreground hover:text-destructive uppercase tracking-widest"
                          onClick={() => removeItem(item.id)}
                        >
                          Retirer
                        </button>
                      </div>
                    </div>
                    <p className="font-mono text-sm text-foreground">{formatCFA(item.price * item.qty)}</p>
                  </div>
                ))}
                <button
                  className="text-xs text-muted-foreground hover:text-destructive uppercase tracking-widest"
                  onClick={clearCart}
                >
                  Vider le panier
                </button>
              </div>

              <div className="bg-secondary rounded-lg p-6 h-fit space-y-6">
                <p className="label-mono text-muted-foreground">Vos informations</p>
                <div className="space-y-3">
                  <input
                    className="w-full h-10 border border-border rounded-md bg-background px-3 text-sm text-foreground outline-none focus:border-ring transition-colors"
                    placeholder="Nom complet *"
                    value={customer.name}
                    onChange={handleChange('name')}
                    maxLength={200}
                    required
                  />
                  <input
                    className="w-full h-10 border border-border rounded-md bg-background px-3 text-sm text-foreground outline-none focus:border-ring transition-colors"
                    placeholder="Téléphone *"
                    type="tel"
                    value={customer.phone}
                    onChange={handleChange('phone')}
                    maxLength={200}
                    required
                  />
                  <textarea
                    className="w-full border border-border rounded-md bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring transition-colors"
                    placeholder="Adresse de livraison *"
                    rows={3}
                    value={customer.address}
                    onChange={handleChange('address')}
                    maxLength={200}
                    required
                  />
                </div>

                <dl className="flex items-center justify-between border-t border-border pt-4">
                  <dt className="text-sm font-medium text-foreground">Total</dt>
                  <dd className="font-mono text-lg font-medium text-foreground">{formatCFA(total)}</dd>
                </dl>

                {(() => {
                  const missingInfo =
                    !customer.name.trim() || !customer.phone.trim() || !customer.address.trim()
                  return (
                    <>
                      <Button
                        onClick={handleOrder}
                        disabled={missingInfo}
                        className="w-full h-12 bg-[#25D366] text-white hover:bg-[#1ebe5b]"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.47 3.53 1.36 5.06L2.05 22l5.19-1.36a9.9 9.9 0 004.8 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.83 14.1c-.25.7-1.45 1.34-2 1.42-.51.08-1.15.11-1.86-.12-.43-.13-.98-.32-1.69-.62-2.97-1.28-4.9-4.28-5.05-4.48-.15-.2-1.21-1.6-1.21-3.06 0-1.45.77-2.17 1.04-2.46.27-.3.6-.37.8-.37.2 0 .4 0 .57.01.18.01.43-.07.67.51.25.6.85 2.07.92 2.22.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.17-.31.38-.45.51-.15.15-.3.31-.13.6.17.3.77 1.27 1.65 2.06 1.14 1.02 2.1 1.34 2.4 1.49.3.15.47.13.65-.08.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.73.82 2.02.97.3.15.5.22.57.35.07.13.07.75-.18 1.45z" />
                        </svg>
                        Commander via WhatsApp
                      </Button>
                      <p className="label-mono text-center text-muted-foreground">
                        {missingInfo
                          ? 'Merci de remplir le nom, le téléphone et l’adresse (*) pour commander'
                          : 'Vous serez redirigé vers WhatsApp pour confirmer votre commande'}
                      </p>
                    </>
                  )
                })()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
