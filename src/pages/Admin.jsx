import { useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore/lite'
import { getDownloadURL, ref, uploadBytes, deleteObject } from 'firebase/storage'
import { db } from '../firebase'
import { auth, storage } from '../firebaseAdmin'
import { useProducts, formatCFA } from '../data/products'
import Button from '../components/ui/Button'

// The admin types a plain username; Firebase Auth needs an email, so we map
// it to a fixed, non-guessable address behind the scenes.
const ADMIN_USERNAME = 'coach alioune'
const ADMIN_EMAIL = 'coach.alioune@delvia-naturel-admin.local'

function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (username.trim().toLowerCase() !== ADMIN_USERNAME) {
      setError('Identifiants incorrects.')
      return
    }
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, ADMIN_EMAIL, password)
    } catch {
      setError('Identifiants incorrects.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-card rounded-lg border border-border p-10 w-full max-w-sm space-y-5">
        <h1 className="text-2xl font-display italic font-normal tracking-[-0.01em] text-center text-foreground mb-2">
          Administration Delvia
        </h1>
        <div className="space-y-3">
          <input
            className="w-full h-10 border border-border rounded-md bg-background px-3 text-sm text-foreground outline-none focus:border-ring transition-colors"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
          <input
            type="password"
            className="w-full h-10 border border-border rounded-md bg-background px-3 text-sm text-foreground outline-none focus:border-ring transition-colors"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" disabled={loading} className="w-full h-11">
          {loading ? 'Connexion...' : 'Se connecter'}
        </Button>
      </form>
    </div>
  )
}

function emptySizeRow() {
  return { format: '', price: '' }
}

const MAX_IMAGE_BYTES = 5 * 1024 * 1024

function validateImageFile(file) {
  if (!file.type.startsWith('image/')) return 'Le fichier doit être une image.'
  if (file.size > MAX_IMAGE_BYTES) return 'Image trop lourde (5 Mo maximum).'
  return null
}

function ProductForm({ product, onSaved, onCancel }) {
  const isEditing = Boolean(product)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [sizes, setSizes] = useState([emptySizeRow()])
  const [file, setFile] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    setName(product?.name ?? '')
    setDescription(product?.description ?? '')
    setSizes(
      product?.sizes?.length
        ? product.sizes.map((s) => ({ format: s.format, price: String(s.price) }))
        : [emptySizeRow()]
    )
    setFile(null)
    setError('')
    setSuccess(false)
  }, [product])

  const updateSize = (index, field, value) => {
    setSizes((rows) => rows.map((row, i) => (i === index ? { ...row, [field]: value } : row)))
  }

  const addSizeRow = () => setSizes((rows) => [...rows, emptySizeRow()])
  const removeSizeRow = (index) => setSizes((rows) => rows.filter((_, i) => i !== index))

  const resetForm = () => {
    setName('')
    setDescription('')
    setSizes([emptySizeRow()])
    setFile(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    const cleanSizes = sizes
      .map((s) => ({ format: s.format.trim(), price: Number(s.price) }))
      .filter((s) => s.format && s.price > 0)

    if (!name.trim() || !description.trim() || cleanSizes.length === 0 || (!isEditing && !file)) {
      setError('Merci de remplir le nom, la description, au moins un format/prix, et une image.')
      return
    }

    if (file) {
      const fileError = validateImageFile(file)
      if (fileError) {
        setError(fileError)
        return
      }
    }

    setSaving(true)
    try {
      let imageUrl = product?.image ?? null
      if (file) {
        const imageRef = ref(storage, `products/${Date.now()}-${file.name}`)
        await uploadBytes(imageRef, file)
        imageUrl = await getDownloadURL(imageRef)

        if (isEditing && product.image?.includes('firebasestorage')) {
          try {
            await deleteObject(ref(storage, product.image))
          } catch {
            // old image already gone or not a storage URL — ignore
          }
        }
      }

      const payload = {
        name: name.trim(),
        description: description.trim(),
        sizes: cleanSizes,
        image: imageUrl,
      }

      if (isEditing) {
        await updateDoc(doc(db, 'products', product.id), payload)
      } else {
        await addDoc(collection(db, 'products'), { ...payload, createdAt: serverTimestamp() })
        resetForm()
      }

      setSuccess(true)
      onSaved?.()
    } catch {
      setError("Une erreur s'est produite. Réessayez.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-secondary rounded-lg p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display italic font-normal tracking-[-0.01em] text-foreground">
          {isEditing ? `Modifier « ${product.name} »` : 'Ajouter un produit'}
        </h2>
        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="label-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            Annuler
          </button>
        )}
      </div>

      <div className="space-y-3">
        <label className="block">
          <span className="label-mono text-muted-foreground">Nom du produit</span>
          <input
            className="mt-1 w-full h-10 border border-border rounded-md bg-background px-3 text-sm text-foreground outline-none focus:border-ring transition-colors"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Super Detox"
          />
        </label>

        <label className="block">
          <span className="label-mono text-muted-foreground">Description</span>
          <textarea
            className="mt-1 w-full border border-border rounded-md bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring transition-colors"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description du produit affichée aux clients"
          />
        </label>

        <div>
          <span className="label-mono text-muted-foreground">Formats et prix</span>
          <div className="mt-1 space-y-2">
            {sizes.map((row, i) => (
              <div key={i} className="flex gap-2">
                <input
                  className="flex-1 h-10 border border-border rounded-md bg-background px-3 text-sm text-foreground outline-none focus:border-ring transition-colors"
                  placeholder="Format (ex: 250g)"
                  value={row.format}
                  onChange={(e) => updateSize(i, 'format', e.target.value)}
                />
                <input
                  type="number"
                  min="0"
                  className="w-32 h-10 border border-border rounded-md bg-background px-3 text-sm text-foreground outline-none focus:border-ring transition-colors"
                  placeholder="Prix CFA"
                  value={row.price}
                  onChange={(e) => updateSize(i, 'price', e.target.value)}
                />
                {sizes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSizeRow(i)}
                    className="text-muted-foreground hover:text-destructive px-2"
                    aria-label="Retirer ce format"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addSizeRow}
            className="mt-2 label-mono text-foreground hover:text-muted-foreground transition-colors"
          >
            + Ajouter un format
          </button>
        </div>

        <label className="block">
          <span className="label-mono text-muted-foreground">
            {isEditing ? 'Photo du produit (laisser vide pour garder l’actuelle)' : 'Photo du produit'}
          </span>
          {isEditing && product.image && (
            <img src={product.image} alt="" className="mt-2 h-14 w-14 rounded-md object-cover bg-card" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const picked = e.target.files?.[0] ?? null
              if (picked) {
                const fileError = validateImageFile(picked)
                if (fileError) {
                  setError(fileError)
                  setFile(null)
                  e.target.value = ''
                  return
                }
              }
              setError('')
              setFile(picked)
            }}
            className="mt-1 w-full text-sm text-muted-foreground"
          />
        </label>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
      {success && (
        <p className="text-sm text-foreground">
          {isEditing ? 'Modifications enregistrées.' : 'Produit ajouté avec succès.'}
        </p>
      )}

      <Button type="submit" disabled={saving} className="w-full h-11">
        {saving ? 'Enregistrement...' : isEditing ? 'Enregistrer les modifications' : 'Ajouter le produit'}
      </Button>
    </form>
  )
}

function ProductList({ products, loading, onEdit, onDeleted, editingId: editingProductId }) {
  const [deletingId, setDeletingId] = useState(null)

  const handleDelete = async (product) => {
    if (!window.confirm(`Supprimer "${product.name}" ?`)) return
    setDeletingId(product.id)
    try {
      await deleteDoc(doc(db, 'products', product.id))
      if (product.image?.includes('firebasestorage')) {
        try {
          await deleteObject(ref(storage, product.image))
        } catch {
          // image already gone or not a storage URL — ignore
        }
      }
      onDeleted?.(product.id)
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) return <p className="text-sm text-muted-foreground">Chargement...</p>

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-display italic font-normal tracking-[-0.01em] text-foreground">Produits actuels</h2>
      <div className="space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className={`flex items-center gap-4 bg-card border rounded-md p-3 ${
              editingProductId === product.id ? 'border-ring' : 'border-border'
            }`}
          >
            <img src={product.image} alt={product.name} className="h-14 w-14 rounded-md object-cover bg-secondary" />
            <div className="grow">
              <p className="text-sm font-medium text-foreground">{product.name}</p>
              <p className="text-xs text-muted-foreground">
                {product.sizes.map((s) => `${s.format} — ${formatCFA(s.price)}`).join(' · ')}
              </p>
            </div>
            <button
              onClick={() => onEdit?.(product)}
              className="label-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              Modifier
            </button>
            <button
              onClick={() => handleDelete(product)}
              disabled={deletingId === product.id}
              className="label-mono text-muted-foreground hover:text-destructive disabled:opacity-50 transition-colors"
            >
              {deletingId === product.id ? '...' : 'Supprimer'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function Dashboard() {
  const { products, loading, refetch } = useProducts()
  const [editingProduct, setEditingProduct] = useState(null)

  const handleSaved = () => {
    setEditingProduct(null)
    refetch()
  }

  const handleDeleted = (deletedId) => {
    setEditingProduct((current) => (current?.id === deletedId ? null : current))
    refetch()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground px-6 py-5 flex items-center justify-between">
        <h1 className="text-xl font-display italic font-normal tracking-[-0.01em]">Administration Delvia</h1>
        <button
          onClick={() => signOut(auth)}
          className="label-mono text-primary-foreground/70 hover:text-primary-foreground transition-colors"
        >
          Déconnexion
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <ProductForm product={editingProduct} onSaved={handleSaved} onCancel={() => setEditingProduct(null)} />
        <ProductList
          products={products}
          loading={loading}
          editingId={editingProduct?.id}
          onEdit={setEditingProduct}
          onDeleted={handleDeleted}
        />
      </div>
    </div>
  )
}

export default function Admin() {
  const [user, setUser] = useState(undefined)

  useEffect(() => onAuthStateChanged(auth, setUser), [])

  if (user === undefined) return null
  return user ? <Dashboard /> : <LoginForm />
}
