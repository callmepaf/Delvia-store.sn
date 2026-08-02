import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const navLinks = [
  { label: 'ACCUEIL', to: '/' },
  { label: 'NOS PRODUITS', to: '/#produits' },
  { label: 'A PROPOS', to: '/#apropos' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { count } = useCart()

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-green-900">
            DELVIA<span className="text-green-600 italic"> N/\TUREL</span>
          </Link>

          <div className="hidden md:block">
            <ul className="flex items-center gap-8 text-xs font-bold tracking-widest text-gray-500">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a className="transition hover:text-green-600" href={link.to}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative p-2 text-green-900 hover:text-green-600 transition" aria-label="Panier">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </Link>

            <div className="hidden sm:flex gap-2">
              <NavLink
                className="rounded-md px-5 py-2 text-sm font-medium text-green-900 border border-green-900 hover:bg-green-900 hover:text-white transition"
                to="/login"
              >
                Connexion
              </NavLink>
              <NavLink
                className="rounded-md bg-green-900 px-5 py-2 text-sm font-medium text-white hover:bg-green-700 transition"
                to="/register"
              >
                S'inscrire
              </NavLink>
            </div>

            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a key={link.label} href={link.to} className="text-sm font-bold tracking-widest text-gray-500 hover:text-green-600">
                {link.label}
              </a>
            ))}
            <div className="flex gap-2 pt-2">
              <NavLink to="/login" className="flex-1 text-center rounded-md px-5 py-2 text-sm font-medium text-green-900 border border-green-900">
                Connexion
              </NavLink>
              <NavLink to="/register" className="flex-1 text-center rounded-md bg-green-900 px-5 py-2 text-sm font-medium text-white">
                S'inscrire
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
