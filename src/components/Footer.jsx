import { useCart } from '../context/CartContext'

export default function Footer() {
  const { openCart } = useCart()

  return (
    <footer className="bg-green-950 text-white py-16 border-t border-green-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
        <div className="space-y-4">
          <h3 className="text-2xl font-serif italic tracking-wider text-green-400">DELVIA STORE</h3>
          <p className="text-green-200/70 font-light text-sm leading-relaxed">
            La pureté naturelle au service de votre équilibre. Des compléments sans artifices, pensés
            par des experts.
          </p>
          <div className="flex justify-center md:justify-start gap-4 pt-2">
            <a
              href="https://www.facebook.com/delvia.naturel"
              className="hover:text-green-400 transition"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/delvia.naturel"
              className="hover:text-green-400 transition"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="https://wa.me/221781199613" className="hover:text-green-400 transition" aria-label="WhatsApp">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.47 3.53 1.36 5.06L2.05 22l5.19-1.36a9.9 9.9 0 004.8 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.83 14.1c-.25.7-1.45 1.34-2 1.42-.51.08-1.15.11-1.86-.12-.43-.13-.98-.32-1.69-.62-2.97-1.28-4.9-4.28-5.05-4.48-.15-.2-1.21-1.6-1.21-3.06 0-1.45.77-2.17 1.04-2.46.27-.3.6-.37.8-.37.2 0 .4 0 .57.01.18.01.43-.07.67.51.25.6.85 2.07.92 2.22.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.17-.31.38-.45.51-.15.15-.3.31-.13.6.17.3.77 1.27 1.65 2.06 1.14 1.02 2.1 1.34 2.4 1.49.3.15.47.13.65-.08.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.73.82 2.02.97.3.15.5.22.57.35.07.13.07.75-.18 1.45z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-bold uppercase tracking-widest text-xs text-green-500">Navigation</h4>
          <nav className="flex flex-col gap-2">
            <a href="/" className="text-sm font-light hover:text-green-400 transition">
              Accueil
            </a>
            <a href="/#produits" className="text-sm font-light hover:text-green-400 transition">
              Boutique
            </a>
            <a href="/#apropos" className="text-sm font-light hover:text-green-400 transition">
              Notre Histoire
            </a>
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-bold uppercase tracking-widest text-xs text-green-500">Assistance</h4>
          <nav className="flex flex-col gap-2">
            <a href="https://wa.me/221781199613" className="text-sm font-light hover:text-green-400 transition">
              Nous écrire sur WhatsApp
            </a>
            <button onClick={openCart} className="text-sm font-light hover:text-green-400 transition text-left">
              Mon panier
            </button>
          </nav>
        </div>

        <div>
          <h4 className="font-bold mb-4 uppercase tracking-widest text-xs text-green-500">Newsletter</h4>
          <p className="text-xs text-green-200/50 mb-4">Rejoignez la communauté pour des conseils bien-être.</p>
          <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Votre email"
              className="bg-green-900/50 border border-green-800 rounded p-3 text-sm focus:outline-none focus:border-green-500 transition"
            />
            <button className="bg-green-600 hover:bg-green-500 p-3 rounded font-bold text-xs uppercase tracking-tighter transition">
              S'abonner
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-green-900 text-center text-[10px] text-green-200/30 uppercase tracking-[0.2em]">
        &copy; 2026 Delvia Naturel. Tous droits réservés.
      </div>
    </footer>
  )
}
