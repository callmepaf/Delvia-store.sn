
import { useState } from 'react'

export default function LazyImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  loading = 'lazy',
  fetchPriority,
}) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-gray-100 ${className}`}>
      <div
        className={`absolute inset-0 bg-gray-200 animate-pulse transition-opacity duration-500 ${
          loaded ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <img
        src={src}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
      />
    </div>
  )
}
