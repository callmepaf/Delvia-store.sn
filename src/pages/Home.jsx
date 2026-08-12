import { useState } from 'react'
import { useProducts } from '../data/products'
import ProductCard from '../components/ProductCard'
import LazyImage from '../components/LazyImage'
import heroImage from '../assets/products/hero.webp'
import drAroua from '../assets/products/dr-aroua.webp'
import { buildWhatsAppLink, CONTACT_WHATSAPP_NUMBER } from '../utils/whatsapp'

export default function Home() {
  const [heroLoaded, setHeroLoaded] = useState(false)
  const { products } = useProducts()

  return (
    <>
      <header className="relative h-[70vh] lg:h-screen flex items-center justify-center overflow-hidden bg-green-900">
        <img
          src={heroImage}
          alt=""
          loading="eager"
          fetchPriority="high"
          decoding="async"
          onLoad={() => setHeroLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            heroLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-serif italic text-white mb-6">
            La nature au service de <span className="text-green-300">votre équilibre</span>
          </h1>
          <a
            href="#produits"
            className="inline-block rounded bg-green-900 px-12 py-4 text-sm font-bold tracking-widest text-white transition hover:bg-green-600"
          >
            Acheter dès maintenant
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section id="produits" className="py-20 scroll-mt-20">
          <h2 className="text-center text-4xl font-serif italic mb-12 font-thin">Nos Produits</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section id="apropos" className="bg-green-50 rounded-3xl py-16 px-8 my-20 scroll-mt-20">
          <h2 className="text-center text-4xl font-serif italic mb-12 font-thin">A PROPOS</h2>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <LazyImage
                src={drAroua}
                alt="Dr Aroua Dellale"
                className="w-full h-150"
                imgClassName="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-12 max-w-4xl mx-auto px-4 py-12">
              <div className="space-y-6">
                <h2 className="text-4xl font-serif italic text-gray-900">
                  L'Âme de <span className="text-green-600">Delvia</span>
                </h2>
                <div className="text-gray-600 font-light leading-relaxed space-y-4 text-justify">
                  <p>
                    <strong className="text-green-900 font-semibold">La Vision :</strong> L'histoire de
                    Delvia est indissociable de la passion de sa co-fondatrice, la{' '}
                    <span className="text-green-700 font-medium">Dr Aroua Dellale</span>. Médecin
                    nutritionniste certifiée et coach sportive, elle a dédié sa carrière à l'étude de la
                    santé globale et de la performance physique par des voies naturelles.
                  </p>
                  <p>
                    <strong className="text-green-900 font-semibold">L'Engagement :</strong> Fervente
                    défenseuse d'une approche holistique, Dr Dellale a créé Delvia pour aider les femmes à
                    naviguer les défis complexes des <span className="italic">déséquilibres hormonaux</span>.
                    Sa double expertise médicale et sportive permet de soutenir le corps de manière
                    authentique.
                  </p>
                </div>
              </div>

              <div className="space-y-6 border-t border-gray-100 pt-10">
                <h2 className="text-3xl font-serif italic text-gray-900">
                  La Pureté <span className="text-green-600">avant tout</span>
                </h2>
                <div className="text-gray-600 font-light leading-relaxed space-y-4">
                  <p>
                    Nos produits sont élaborés avec une exigence absolue : vous offrir la nature à l'état
                    pur. Chez Delvia, nous garantissons des suppléments{' '}
                    <strong className="text-green-900 font-semibold">100% naturels</strong>, sans compromis.
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {['Zéro sucre ajouté', 'Aucun arôme artificiel', 'Ingrédients de haute qualité', 'Transparence totale'].map(
                      (item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                          <span>{item}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>

              <a
                href={buildWhatsAppLink(
                  "Bonjour Delvia Naturel, je souhaite en savoir plus sur vos produits.",
                  CONTACT_WHATSAPP_NUMBER,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded bg-green-600 px-8 py-3 text-sm font-bold tracking-widest text-white transition hover:bg-green-700"
              >
                Discuter sur WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
