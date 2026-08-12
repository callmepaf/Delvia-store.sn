import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '', terms: false })

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // No backend is connected yet — orders are placed via WhatsApp from the cart.
  }

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 py-12">
      <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto p-8 rounded-lg border border-border bg-card">
        <h1 className="text-2xl font-display italic font-normal tracking-[-0.01em] text-foreground text-center mb-8">
          Créer un compte
        </h1>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground" htmlFor="email">
              Adresse mail
            </label>
            <input
              placeholder="johndoe@gmail.com"
              className="h-10 w-full border border-border rounded-md bg-background px-3 text-sm text-foreground outline-none focus:border-ring transition-colors"
              id="email"
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground" htmlFor="password">
              Mot de passe
            </label>
            <input
              className="h-10 w-full border border-border rounded-md bg-background px-3 text-sm text-foreground outline-none focus:border-ring transition-colors"
              placeholder="Votre mot de passe"
              id="password"
              type="password"
              value={form.password}
              onChange={handleChange('password')}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground" htmlFor="confirmPassword">
              Confirmer le mot de passe
            </label>
            <input
              className="h-10 w-full border border-border rounded-md bg-background px-3 text-sm text-foreground outline-none focus:border-ring transition-colors"
              placeholder="Confirmation"
              id="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange('confirmPassword')}
              required
            />
          </div>

          <div className="flex items-start gap-3">
            <input
              className="mt-0.5 h-4 w-4 rounded border border-border bg-background accent-foreground"
              type="checkbox"
              id="terms"
              checked={form.terms}
              onChange={handleChange('terms')}
            />
            <label className="text-sm text-muted-foreground" htmlFor="terms">
              J'accepte les{' '}
              <a href="#" className="text-foreground underline-offset-4 hover:underline">
                Termes et Conditions
              </a>
            </label>
          </div>

          <Button className="w-full h-11 mt-2" type="submit">
            Créer un compte
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Déjà un compte ?{' '}
            <Link to="/login" className="text-foreground underline-offset-4 hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </form>
    </main>
  )
}
