import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // No backend is connected yet — orders are placed via WhatsApp from the cart.
  }

  return (
    <main className="flex items-center min-h-[calc(100vh-4rem)] px-2 sm:px-0">
      <form onSubmit={handleSubmit} className="w-full max-w-sm sm:max-w-xl mx-auto p-4 rounded-xl shadow-md">
        <div className="px-4 m-4 text-center">
          <h2 className="text-xl font-bold">Connectez-vous à votre compte</h2>
        </div>

        <div className="inputs p-4 w-full">
          <div className="grid grid-cols-1 max-w-md mx-auto gap-2">
            <div>
              <label className="block my-2" htmlFor="email">
                Adresse mail
              </label>
              <input
                className="w-full border-2 rounded-md px-3 py-2 my-1 shadow-sm"
                type="email"
                id="email"
                value={form.email}
                onChange={handleChange('email')}
                placeholder="Entrez votre email"
                required
              />
            </div>
            <div>
              <label className="block my-2" htmlFor="password">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  className="w-full border-2 rounded-md px-3 py-2 my-1 shadow-sm"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={form.password}
                  onChange={handleChange('password')}
                  required
                />
                <button
                  type="button"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-600"
                  aria-label="Afficher le mot de passe"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
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
            <button
              className="w-full bg-green-700 text-gray-50 rounded-md shadow-sm px-3 py-2 my-4 hover:bg-green-600"
              type="submit"
            >
              Se connecter
            </button>
            <p className="text-center text-sm text-gray-500">
              Pas encore de compte ?{' '}
              <Link to="/register" className="text-green-700 font-medium hover:underline">
                S'inscrire
              </Link>
            </p>
          </div>
        </div>
      </form>
    </main>
  )
}
