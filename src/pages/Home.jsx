import { useState } from 'react'
import { useProducts } from '../data/products'
import ProductCard from '../components/ProductCard'
import LazyImage from '../components/LazyImage'
import { buttonClasses } from '../components/ui/Button'
import heroImage from '../assets/products/hero.webp'
import drAroua from '../assets/products/dr-aroua.webp'
import { buildWhatsAppLink, CONTACT_WHATSAPP_NUMBER } from '../utils/whatsapp'

const PROMISES = ['Zéro sucre ajouté', 'Aucun arôme artificiel', 'Ingrédients de haute qualité', 'Transparence totale']

export default function Home() {
  const [heroLoaded, setHeroLoaded] = useState(false)
  const { products } = useProducts()

  return (
    <>
      <header className="relative h-[70vh] lg:h-screen flex items-center justify-center overflow-hidden bg-primary">
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
          <p className="label-mono text-white/70 mb-4">Delvia Naturel</p>
          <h1 className="text-4xl md:text-6xl font-display italic font-normal leading-[1.05] tracking-[-0.01em] text-white text-balance mb-6">
            La nature au service de votre équilibre
          </h1>
          <a href="#produits" className={buttonClasses({ className: 'h-11 px-10' })}>
            Acheter dès maintenant
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6">
        <section id="produits" className="py-16 lg:py-20 scroll-mt-20">
          <div className="mb-10 flex flex-col items-center gap-2 text-center">
            <p className="label-mono text-muted-foreground">Catalogue</p>
            <h2 className="text-2xl lg:text-3xl font-display italic font-normal tracking-[-0.01em]">Nos produits</h2>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section id="apropos" className="bg-secondary rounded-lg py-16 px-6 sm:px-10 my-16 lg:my-20 scroll-mt-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative aspect-4/5 lg:aspect-auto lg:h-full overflow-hidden rounded-lg bg-secondary">
              <LazyImage
                src={drAroua}
                alt="Dr Aroua Dellale"
                className="h-full w-full"
                imgClassName="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-10 py-4">
              <div className="space-y-4">
                <p className="label-mono text-muted-foreground">À propos</p>
                <h2 className="text-2xl lg:text-3xl font-display italic font-normal tracking-[-0.01em] text-foreground">
                  L'Âme de Delvia
                </h2>
                <div className="text-sm leading-relaxed text-muted-foreground text-pretty space-y-4">
                  <p>
                    <strong className="font-medium text-foreground">La Vision : </strong>L'histoire de Delvia est
                    indissociable de la passion de sa co-fondatrice, la Dr Aroua Dellale. Médecin nutritionniste
                    certifiée et coach sportive, elle a dédié sa carrière à l'étude de la santé globale et de la
                    performance physique par des voies naturelles.
                  </p>
                  <p>
                    <strong className="font-medium text-foreground">L'Engagement : </strong>Fervente défenseuse
                    d'une approche holistique, Dr Dellale a créé Delvia pour aider les femmes à naviguer les défis
                    complexes des <span className="italic">déséquilibres hormonaux</span>. Sa double expertise
                    médicale et sportive permet de soutenir le corps de manière authentique.
                  </p>
                </div>
              </div>

              <div className="space-y-4 border-t border-border pt-8">
                <h3 className="text-xl lg:text-2xl font-display italic font-normal tracking-[-0.01em] text-foreground">
                  La Pureté avant tout
                </h3>
                <div className="text-sm leading-relaxed text-muted-foreground text-pretty space-y-4">
                  <p>
                    Nos produits sont élaborés avec une exigence absolue : vous offrir la nature à l'état pur. Chez
                    Delvia, nous garantissons des suppléments{' '}
                    <strong className="font-medium text-foreground">100% naturels</strong>, sans compromis.
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    {PROMISES.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-foreground" />
                        <span>{item}</span>
                      </li>
                    ))}
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
                className={buttonClasses({ className: 'h-11 px-6' })}
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
