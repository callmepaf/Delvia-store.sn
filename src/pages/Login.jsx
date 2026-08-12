import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // No backend is connected yet — orders are placed via WhatsApp from the cart.
  }

  return (
    <main className="flex items-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 py-12">
      <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto p-8 rounded-lg border border-border bg-card">
        <h1 className="text-2xl font-display italic font-normal tracking-[-0.01em] text-foreground text-center mb-8">
          Connectez-vous à votre compte
        </h1>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground" htmlFor="email">
              Adresse mail
            </label>
            <input
              className="h-10 w-full border border-border rounded-md bg-background px-3 text-sm text-foreground outline-none focus:border-ring transition-colors"
              type="email"
              id="email"
              value={form.email}
              onChange={handleChange('email')}
              placeholder="Entrez votre email"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground" htmlFor="password">
              Mot de passe
            </label>
            <div className="relative">
              <input
                className="h-10 w-full border border-border rounded-md bg-background px-3 pr-10 text-sm text-foreground outline-none focus:border-ring transition-colors"
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={form.password}
                onChange={handleChange('password')}
                required
              />
              <button
                type="button"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Afficher le mot de passe"
                onClick={() => setShowPassword((v) => !v)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                  {showPassword ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  ) : (
                    <>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>

          <Button className="w-full h-11 mt-2" type="submit">
            Se connecter
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Pas encore de compte ?{' '}
            <Link to="/register" className="text-foreground underline-offset-4 hover:underline">
              S'inscrire
            </Link>
          </p>
        </div>
      </form>
    </main>
  )
}
