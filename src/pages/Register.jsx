import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '', terms: false })

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // No backend is connected yet — orders are placed via WhatsApp from the cart.
  }

  return (
    <main>
      <form onSubmit={handleSubmit} className="mt-[50px]">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Créer un compte
              </p>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="email">
                  Adresse mail
                </label>
                <input
                  placeholder="JohnDoe@gmail.com"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="password">
                  Mot de passe
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="Votre mot de passe"
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange('password')}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="confirmPassword">
                  Confirmer le mot de passe
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="Confirmation"
                  id="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  required
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                    type="checkbox"
                    id="terms"
                    checked={form.terms}
                    onChange={handleChange('terms')}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label className="font-light text-gray-500" htmlFor="terms">
                    J'accepte les{' '}
                    <a href="#" className="font-medium text-green-600 hover:underline">
                      Termes et Conditions
                    </a>
                  </label>
                </div>
              </div>

              <button
                className="w-full bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
                type="submit"
              >
                Créer un compte
              </button>

              <p className="text-center text-sm text-gray-500">
                Déjà un compte ?{' '}
                <Link to="/login" className="text-green-700 font-medium hover:underline">
                  Se connecter
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </main>
  )
}
