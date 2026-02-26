'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { products } from '@/lib/products'
import { motion } from 'framer-motion'
import { ChevronLeft, Star } from 'lucide-react'
import { useState } from 'react'
import { PajamaOrderForm } from '@/components/pajama-order-form'

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string

  const product = products.find((p) => p.id === productId)

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold text-foreground mb-4">Produit introuvable</h1>
            <Link href="/collections">
              <Button className="cta-primary">Retour aux produits</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const [showForm, setShowForm] = useState(false)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <section className="py-6 bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/collections" className="flex items-center gap-2 text-primary hover:underline text-sm">
              <ChevronLeft className="w-4 h-4" />
              Retour aux produits
            </Link>
          </div>
        </section>

        {/* Product Detail */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Images */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                {/* Main Image */}
                <div className="aspect-square bg-gradient-to-br from-muted to-muted-foreground flex items-center justify-center text-muted-foreground relative overflow-hidden rounded-lg">
                  <div className="absolute top-3 right-3">
                    {product.badge === 'bestseller' && (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Bestseller
                      </span>
                    )}
                    {product.badge === 'sale' && (
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Solde -22%
                      </span>
                    )}
                    {product.badge === 'new' && (
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Nouveau
                      </span>
                    )}
                  </div>
                  <p className="text-8xl">{product.image}</p>
                </div>

                {/* Gallery Images */}
                {product.galleryImages && product.galleryImages.length > 0 && (
                  <div className="flex gap-3">
                    {product.galleryImages.slice(0, 2).map((img, idx) => (
                      <div key={idx} className="flex-1 aspect-square bg-gradient-to-br from-muted-foreground to-background flex items-center justify-center text-muted text-4xl rounded-lg">
                        {img}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-2">{product.name}</h1>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviews} avis)
                    </span>
                  </div>
                  <p className="text-lg text-muted-foreground">{product.description}</p>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  {product.salePrice ? (
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-bold text-primary">{product.salePrice.toFixed(2)}DH</span>
                      <span className="text-xl line-through text-muted-foreground">{product.price.toFixed(2)}DH</span>
                    </div>
                  ) : (
                    <span className="text-4xl font-bold text-primary">{product.price.toFixed(2)}DH</span>
                  )}
                </div>

                {/* Stock */}
                <div>
                  {product.inStock ? (
                    <span className="text-sm text-green-600 font-semibold">En stock</span>
                  ) : (
                    <span className="text-sm text-red-600 font-semibold">Rupture de stock</span>
                  )}
                </div>

                {/* Colors */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-foreground">Couleurs disponibles:</label>
                  <div className="flex gap-2 flex-wrap">
                    {product.colors.map((color) => (
                      <span key={color} className="text-sm bg-muted px-3 py-2 rounded font-medium text-foreground">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-foreground">Tailles disponibles:</label>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                      <span key={size} className="text-sm bg-muted px-3 py-2 rounded font-medium text-foreground">
                        {size}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-foreground">Caractéristiques:</label>
                  <ul className="space-y-2">
                    {product.features.map((feature) => (
                      <li key={feature} className="text-sm text-foreground flex items-center gap-2">
                        <span className="text-primary">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Add to Cart Button */}
                <div className="pt-4 border-t border-border">
                  <Button
                    onClick={() => setShowForm(!showForm)}
                    disabled={!product.inStock}
                    className="w-full cta-primary h-12 text-base"
                  >
                    {showForm ? 'Fermer' : 'Acheter maintenant'}
                  </Button>
                </div>

                {/* Order Form */}
                {showForm && (
                  <div className="pt-4 border-t border-border">
                    <PajamaOrderForm
                      selectedModel={product.name}
                      selectedSize={product.sizes[0]}
                      selectedColor={product.colors[0]}
                      quantity={1}
                      unitPrice={product.salePrice || product.price}
                    />
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-8">Produits similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products
                .filter((p) => p.collection === product.collection && p.id !== product.id)
                .slice(0, 3)
                .map((relatedProduct) => (
                  <Link key={relatedProduct.id} href={`/collections/${relatedProduct.id}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-border cursor-pointer group"
                    >
                      <div className="aspect-square bg-gradient-to-br from-muted to-muted-foreground flex items-center justify-center text-muted-foreground relative overflow-hidden">
                        <p className="text-6xl group-hover:scale-110 transition-transform">{relatedProduct.image}</p>
                      </div>
                      <div className="p-4">
                        <h3 className="font-serif font-bold text-foreground mb-2 line-clamp-2">{relatedProduct.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary">
                            {(relatedProduct.salePrice || relatedProduct.price).toFixed(2)}DH
                          </span>
                          {relatedProduct.badge && (
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                              {relatedProduct.badge === 'bestseller' ? 'Bestseller' : 'Nouveau'}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-serif font-bold text-foreground">
                Des questions? Contactez-nous
              </h2>
              <a
                href="https://wa.me/33652768993?text=Bonjour, j'aimerais plus d'infos sur ce produit!"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="cta-primary h-12">
                  Discuter sur WhatsApp
                </Button>
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
