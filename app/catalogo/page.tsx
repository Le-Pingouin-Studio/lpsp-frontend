'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { useProductStore } from "../../store/useProductStore";
import { useCategoryStore } from "../../store/useCategoryStore";

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

  if (loadingProducts || loadingCategories) {
    return <div className="py-20 text-center text-on-surface">Cargando catálogo...</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="text-center max-w-4xl mx-auto mb-20">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-dark mb-4">Catálogo de Impresiones 3D</h1>
        <p className="text-lg text-on-surface-variant leading-relaxed">
          Descubre nuestra selección de componentes de alta precisión. Desde prototipos industriales hasta piezas de arte orgánico, fabricados con los materiales más avanzados del sector.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0 bg-surface rounded-2xl p-6 border border-outline-variant sticky top-24">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.productId} className="flex flex-col h-full group">
                <div className="relative h-[250px] w-full bg-surface overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                    {product.stock <= 0 && <Badge variant="neutral">AGOTADO</Badge>}
                    {product.category?.name && <Badge variant="secondary">{product.category.name}</Badge>}
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.imageUrl || "/placeholder.png"}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1682532015751-4c7ca29bb4f1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
                    }}
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
            ))}

            {products.length === 0 && (
              <div className="col-span-full py-12 text-center border border-dashed border-outline-variant rounded-2xl">
                <p className="text-on-surface-variant">No hay productos disponibles en este momento.</p>
              </div>
            )}
          </div>

          {hasMore && (
            <div className="mt-12 flex justify-center">
              <Button 
                variant="secondary" 
                size="lg" 
                className="rounded-full px-8"
                onClick={loadMoreProducts}
                disabled={isLoadingMore}
              >
                {isLoadingMore ? "Cargando..." : "Cargar Más Piezas"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
