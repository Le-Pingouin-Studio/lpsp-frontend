'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { useProductStore } from "../../store/useProductStore";
import { useCategoryStore } from "../../store/useCategoryStore";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function CatalogPage() {
  const { 
    products, 
    loadingProducts, 
    fetchProducts, 
    loadMoreProducts, 
    hasMore, 
    isLoadingMore, 
    currentCategories, 
    currentSort 
  } = useProductStore();
  
  const { categories, loadingCategories, fetchCategories } = useCategoryStore();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasMore && !isLoadingMore) {
      loadMoreProducts();
    }
  }, [inView, hasMore, isLoadingMore, loadMoreProducts]);

  const toggleCategory = (slug: string) => {
    const newCategories = currentCategories.includes(slug)
      ? currentCategories.filter((s) => s !== slug)
      : [...currentCategories, slug];
    fetchProducts({ categories: newCategories });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    fetchProducts({ sort: e.target.value });
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  if (loadingProducts && products.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="animate-pulse space-y-8 max-w-4xl mx-auto text-center">
           <div className="h-12 bg-surface-dim rounded-lg w-3/4 md:w-1/2 mx-auto mb-4"></div>
           <div className="h-6 bg-surface-dim rounded w-full md:w-3/4 mx-auto"></div>
        </div>
        <div className="flex flex-col md:flex-row gap-8 items-start mt-20">
          <div className="hidden md:block w-64 h-96 bg-surface-dim rounded-2xl shrink-0 animate-pulse"></div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[400px] bg-surface-dim rounded-2xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <motion.div 
        className="text-center max-w-4xl mx-auto mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-primary-dark mb-4">Catálogo de Impresiones 3D</h1>
        <p className="text-lg text-on-surface-variant leading-relaxed">
          Descubre nuestra selección de componentes de alta precisión. Desde prototipos industriales hasta piezas de arte orgánico, fabricados con los materiales más avanzados del sector.
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="md:hidden mb-4">
            <Button 
              variant="secondary" 
              className="w-full flex justify-between items-center" 
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              Filtros
              <span>{showMobileFilters ? "▲" : "▼"}</span>
            </Button>
          </div>
          
          <div className={`${showMobileFilters ? "block" : "hidden"} md:block bg-surface rounded-2xl p-6 border border-outline-variant md:sticky md:top-24`}>
            <div className="mb-8">
              <h3 className="text-xs font-bold tracking-wider uppercase text-primary-dark mb-4">Categorías</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentCategories.length === 0}
                    onChange={() => fetchProducts({ categories: [] })}
                    className="accent-secondary w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary"
                  />
                  <span className="text-sm text-on-surface">Todos</span>
                </label>
                {categories.map((category) => (
                  <label key={category.categoryId} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentCategories.includes(category.slug)}
                      onChange={() => toggleCategory(category.slug)}
                      className="accent-secondary w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary"
                    />
                    <span className="text-sm text-on-surface">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-bold tracking-wider uppercase text-outline">
              MOSTRANDO {products.length} RESULTADOS
            </span>
            <select
              className="bg-transparent text-sm font-medium text-on-surface cursor-pointer focus:outline-none"
              value={currentSort}
              onChange={handleSortChange}
            >
              <option value="Relevancia">Relevancia</option>
              <option value="Menor Precio">Menor Precio</option>
              <option value="Mayor Precio">Mayor Precio</option>
            </select>
          </div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {products.map((product) => (
              <motion.div key={product.productId} variants={fadeUpVariant} layout>
                <Card className="flex flex-col h-full group">
                  <div className="relative h-[250px] w-full bg-surface overflow-hidden">
                    <div className="absolute top-4 left-4 z-10 flex gap-2">
                      {product.stock <= 0 && <Badge variant="neutral">AGOTADO</Badge>}
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
                  <div className="p-6 flex flex-col grow">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h3 className="text-lg font-bold text-primary-dark line-clamp-2">{product.name}</h3>
                      <span className="text-lg font-bold text-secondary-dark shrink-0">${Number(product.price).toFixed(2)}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-auto">
                      <Link href={`https://wa.me/542996895145?text=Hola!%20Me%20interesa%20consultar%20por%20el%20producto%20%22${encodeURIComponent(product.name)}%22`} target="_blank" rel="noopener noreferrer">
                        <Button variant="primary" size="sm" className="w-full text-xs">Consultar</Button>
                      </Link>
                      <Link href={`/catalogo/${product.productId}`}>
                        <Button variant="secondary" size="sm" className="w-full text-xs">Detalles</Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

            {products.length === 0 && (
              <div className="col-span-full py-12 text-center border border-dashed border-outline-variant rounded-2xl">
                <p className="text-on-surface-variant">No hay productos disponibles en este momento.</p>
              </div>
            )}
          </motion.div>

          {hasMore && (
            <div ref={ref} className="mt-12 flex justify-center py-8">
              {isLoadingMore && (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm text-on-surface-variant font-medium">Cargando más productos...</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

