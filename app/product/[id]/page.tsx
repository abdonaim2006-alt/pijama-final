'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { products, getProductById } from '@/lib/products'
import { motion } from 'framer-motion'
import { ChevronLeft, Star, Truck, RefreshCw, Shield } from 'lucide-react'
import { useState } from 'react'
import { SingleProductOrderForm } from '@/components/single-product-order-form'

function ProductDetailsSection() {
  return (
    <section className="py-16 bg-background/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Truck, title: 'Livraison Rapide', desc: 'Partout au Maroc en 24-48h' },
            { icon: RefreshCw, title: 'Retour Gratuit', desc: '30 jours pour changer d\'avis' },
            { icon: Shield, title: 'Paiement Sécurisé', desc: 'Paiement à la livraison' },
          ].map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductDetailsImages() {
  const detailImages = [
    { label: 'Vu de face', emoji: '👕' },
    { label: 'Vu de profil', emoji: '👖' },
    { label: 'Détail tissu', emoji: '🧵' },
    { label: 'Vu de dos', emoji: '🔄' },
  ]

  return (
    <section className="py-16 bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-2 text-foreground">
            Détails du Produit
          </h2>
          <p className="text-muted-foreground">Regardez chaque angle de votre pyjama</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {detailImages.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-full aspect-square bg-gradient-to-br from-muted to-muted-foreground rounded-lg flex items-center justify-center mb-3 border border-border hover:shadow-md transition-shadow">
                <span className="text-5xl sm:text-6xl">{img.emoji}</span>
              </div>
              <p className="text-sm sm:text-base font-medium text-foreground">{img.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const product = getProductById(productId)
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || 'M')
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || 'Noir')
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-serif font-bold text-foreground">Produit introuvable</h1>
            <p className="text-muted-foreground">Désolé, ce produit n'existe pas.</p>
            <Link href="/">
              <Button className="cta-primary">Retour à l'accueil</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <section className="py-6 bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-2 text-primary hover:underline text-sm">
              <ChevronLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>
          </div>
        </section>

        {/* Product Main Section */}
        <section className="py-12 sm:py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Product Image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center"
              >
                <div className="w-full aspect-square bg-gradient-to-br from-muted to-muted-foreground rounded-2xl flex items-center justify-center relative overflow-hidden shadow-lg">
                  {product.badge && (
                    <div className="absolute top-6 right-6 z-10">
                      <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                        {product.badge === 'bestseller' ? 'Bestseller' : product.badge === 'new' ? 'Nouveau' : 'Solde'}
                      </span>
                    </div>
                  )}
                  <p className="text-8xl sm:text-9xl">{product.image}</p>
                </div>
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Title & Rating */}
                  <div>
                    <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-4">
                      {product.name}
                    </h1>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(product.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-muted'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-semibold text-foreground">{product.rating}</span>
                      <span className="text-sm text-muted-foreground">({product.reviews} avis)</span>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    {product.salePrice ? (
                      <div className="flex items-center gap-4">
                        <span className="text-4xl font-bold text-primary">€{product.salePrice.toFixed(2)}</span>
                        <span className="text-2xl line-through text-muted-foreground">€{product.price.toFixed(2)}</span>
                        <span className="text-sm font-semibold bg-red-100 text-red-700 px-3 py-1 rounded-full">
                          -22%
                        </span>
                      </div>
                    ) : (
                      <span className="text-4xl font-bold text-primary">{product.price.toFixed(2)} DH</span>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground">Caractéristiques</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Colors */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-foreground">Couleur</label>
                    <div className="flex gap-3 flex-wrap">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-4 py-2 rounded-lg border-2 transition-all ${
                            selectedColor === color
                              ? 'border-primary bg-primary/10'
                              : 'border-muted-foreground/20 hover:border-primary/50'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sizes */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-foreground">Taille</label>
                    <div className="flex gap-3 flex-wrap">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 rounded-lg border-2 transition-all ${
                            selectedSize === size
                              ? 'border-primary bg-primary/10'
                              : 'border-muted-foreground/20 hover:border-primary/50'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-foreground">Quantité</label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-lg border border-muted-foreground/20 hover:bg-muted flex items-center justify-center"
                      >
                        −
                      </button>
                      <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 rounded-lg border border-muted-foreground/20 hover:bg-muted flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Stock Status */}
                  <div className={`p-3 rounded-lg ${product.inStock ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {product.inStock ? '✓ En stock' : '✗ Rupture de stock'}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Order Form Section */}
        <section className="py-12 sm:py-16 bg-background border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SingleProductOrderForm
                selectedModel={product.name}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
                quantity={quantity}
                unitPrice={product.salePrice || product.price}
              />
            </motion.div>
          </div>
        </section>

        {/* Product Details Images Section */}
        <ProductDetailsImages />

        {/* Recommendations */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-2 text-foreground">
                Produits Similaires
              </h2>
              <p className="text-muted-foreground">Vous pourriez aussi aimer</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products
                .filter((p) => p.collection === product.collection && p.id !== product.id)
                .slice(0, 3)
                .map((relatedProduct) => (
                  <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-border cursor-pointer"
                    >
                      <div className="aspect-square bg-gradient-to-br from-muted to-muted-foreground flex items-center justify-center relative overflow-hidden">
                        {relatedProduct.badge && (
                          <div className="absolute top-3 right-3 z-10">
                            <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                              {relatedProduct.badge === 'bestseller' ? 'Bestseller' : relatedProduct.badge === 'new' ? 'Nouveau' : 'Solde'}
                            </span>
                          </div>
                        )}
                        <p className="text-6xl">{relatedProduct.image}</p>
                      </div>
                      <div className="p-4">
                        <h3 className="font-serif font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                          {relatedProduct.name}
                        </h3>
                        <p className="text-2xl font-bold text-primary">
                          {(relatedProduct.salePrice || relatedProduct.price).toFixed(2)} DH
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <ProductDetailsSection />
      </main>
      <Footer />
    </>
  )
}
