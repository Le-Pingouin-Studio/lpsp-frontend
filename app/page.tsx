'use client'
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { useProductStore } from "../store/useProductStore";

export default function Home() {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const featuredProducts = products.slice(0, 3); // Get first 3 products for the landing

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark leading-[1.1] mb-6 tracking-tight">
              Nos gustan las cosas bien hechas
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant mb-8 leading-relaxed">
              Combinamos la ingeniería 3D de alta precisión con el cuidado artesanal de pegar, pintar y revisar cada pieza a mano. Calidad industrial, directo de nuestro taller a tus manos.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="https://wa.me/542996895145" target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg">Enviar Diseño vía WhatsApp</Button>
              </Link>
              <Link href="/catalogo">
                <Button variant="secondary" size="lg">Ver Catálogo</Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            {/* Hero Image / Graphic placeholder */}
            <div className="aspect-square bg-gradient-to-br from-surface-dim to-surface-dim/50 rounded-3xl shadow-xl flex items-center justify-center border border-outline-variant/30 relative overflow-hidden">
              <img
                src="/impresora3dheroimage.jpg"
                alt="Impresión 3D de alta precisión"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Preview Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8 border-b border-outline-variant pb-4">
          <h2 className="text-3xl font-bold text-primary-dark">Explorar Catálogo</h2>
          <Link href="/catalogo" className="text-sm font-medium text-secondary hover:text-secondary-dark flex items-center gap-1 transition-colors">
            Ver todo &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <Card key={product.productId} className="flex flex-col h-full group">
                <div className="relative h-[250px] w-full bg-surface overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                    <Badge variant={product.stock > 0 ? "primary" : "neutral"}>
                      {product.stock > 0 ? `${product.stock} DISPONIBLES` : "SIN STOCK"}
                    </Badge>
                    {product.category?.name && <Badge variant="secondary">{product.category.name}</Badge>}
                  </div>
                  <Image
                    src={product.imageUrl || 'https://images.unsplash.com/photo-1682532015751-4c7ca29bb4f1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain p-4 pt-12 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-primary-dark mb-1">{product.name}</h3>
                  <p className="text-sm text-on-surface-variant line-clamp-2 mb-4">
                    {product.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-bold text-primary-dark">${Number(product.price).toFixed(2)}</span>
                    <Link href={`/catalogo/${product.productId}`}>
                      <Button variant="secondary" size="sm">Consultar</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="flex flex-col h-[400px] animate-pulse">
                <div className="aspect-square bg-surface-dim w-full" />
                <div className="p-6 flex flex-col gap-4">
                  <div className="h-6 bg-surface-dim rounded w-3/4" />
                  <div className="h-4 bg-surface-dim rounded w-1/4" />
                  <div className="mt-auto flex justify-between items-center">
                    <div className="h-6 bg-surface-dim rounded w-1/4" />
                    <div className="h-8 bg-surface-dim rounded w-24" />
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </section>

      {/* Process Section */}
      {/* <section className="bg-surface-dim py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary-dark mb-4">Nuestro Proceso</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto mb-16">
            Tecnología de punta para resultados extraordinarios.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-surface shadow-sm flex items-center justify-center text-secondary mb-6 text-2xl">
                📄
              </div>
              <h3 className="text-lg font-bold text-primary-dark mb-2">1. Sube</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Sube tu archivo STL o elige de nuestro catálogo curado.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-surface shadow-sm flex items-center justify-center text-secondary mb-6 text-2xl">
                🎛️
              </div>
              <h3 className="text-lg font-bold text-primary-dark mb-2">2. Configura</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Elige materiales, colores y nivel de detalle.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-surface shadow-sm flex items-center justify-center text-secondary mb-6 text-2xl">
                ⚙️
              </div>
              <h3 className="text-lg font-bold text-primary-dark mb-2">3. Imprime</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Nuestras máquinas de alta precisión inician el proceso.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-surface shadow-sm flex items-center justify-center text-secondary mb-6 text-2xl">
                📦
              </div>
              <h3 className="text-lg font-bold text-primary-dark mb-2">4. Recibe</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Envío seguro y rápido directamente a tu puerta.
              </p>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}