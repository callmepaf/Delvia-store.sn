import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { buttonClasses } from './ui/Button'

const navLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'Nos produits', to: '/#produits' },
  { label: 'À propos', to: '/#apropos' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { count, openCart } = useCart()

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md" aria-label="Navigation principale">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center gap-6">
          <Link to="/" className="shrink-0 text-2xl font-bold tracking-tighter text-green-900">
            DELVIA<span className="text-green-600 italic"> N/\TUREL</span>
          </Link>

          <div className="hidden md:flex flex-1 items-center gap-6">
            {navLinks.map((link) => (
              <a key={link.label} className="text-sm text-muted-foreground transition-colors hover:text-foreground" href={link.to}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={openCart}
              className="relative p-2 rounded-md text-foreground hover:bg-secondary transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              aria-label="Panier"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary font-mono text-[0.6rem] text-primary-foreground">
                  {count}
                </span>
              )}
            </button>

            <div className="hidden sm:flex gap-1">
              <NavLink className={buttonClasses({ variant: 'ghost', className: 'h-9 px-4' })} to="/login">
                Connexion
              </NavLink>
              <NavLink className={buttonClasses({ className: 'h-9 px-4' })} to="/register">
                S'inscrire
              </NavLink>
            </div>

            <button
              className="md:hidden p-2 rounded-md text-foreground hover:bg-secondary transition-colors"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-3 border-t border-border pt-4">
            {navLinks.map((link) => (
              <a key={link.label} href={link.to} className="text-sm text-muted-foreground hover:text-foreground">
                {link.label}
              </a>
            ))}
            <div className="flex gap-2 pt-2">
              <NavLink to="/login" className={buttonClasses({ variant: 'outline', className: 'flex-1 h-10' })}>
                Connexion
              </NavLink>
              <NavLink to="/register" className={buttonClasses({ className: 'flex-1 h-10' })}>
                S'inscrire
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
