'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "../../../components/ui/Button";
import { useProductStore } from "../../../store/useProductStore";
import { getWhatsAppProductLink } from "../../../lib/whatsapp";
import { ImageZoomModal } from "../../../components/ui/ImageZoomModal";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;

  const { selectedProduct: product, loadingSelectedProduct, fetchProductById } = useProductStore();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);

  useEffect(() => {
    fetchProductById(id);
  }, [id, fetchProductById]);

  if (loadingSelectedProduct) {
    return <div className="py-20 text-center text-on-surface">Cargando producto...</div>;
  }

  if (!product) {
    notFound();
  }

  // URL of the current product
  // Ideally this would come from headers or a config, but hardcoding for MVP based on local dev
  const productUrl = `http://localhost:3000/catalogo/${id}`;
  const whatsappLink = getWhatsAppProductLink(product.name, productUrl);

  const allImagesUrls = product.images && product.images.length > 0
    ? product.images.map(img => img.secureUrl || (img as any).secure_url)
    : [product.imageUrl || "/placeholder.png"];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 overflow-hidden">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/catalogo" className="text-sm font-medium text-secondary hover:text-secondary-dark flex items-center gap-2 transition-colors">
          &larr; Volver al catálogo
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Left column: Images */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div
            className="aspect-square bg-surface-dim rounded-3xl overflow-hidden p-8 flex items-center justify-center border border-outline-variant/50 relative cursor-zoom-in group"
            onClick={() => setIsZoomModalOpen(true)}
          >
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
              <span className="bg-white/80 text-black px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm shadow-sm opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 transform duration-300">
                Click para ampliar
              </span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              key={selectedImageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={product.images && product.images.length > 0 ? product.images[selectedImageIndex]?.secureUrl : (product.imageUrl || "/placeholder.png")}
              alt={product.name}
              className="w-full h-full object-contain mix-blend-multiply"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1594902347265-7d4b4a1b023f?q=80&w=1000&auto=format&fit=crop';
              }}
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`shrink-0 w-20 h-20 rounded-xl border-2 overflow-hidden bg-surface-dim transition-colors ${selectedImageIndex === index ? 'border-primary' : 'border-transparent hover:border-outline-variant'}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.secureUrl || (img as any).secure_url} alt={`${product.name} - Imagen ${index + 1}`} className={`w-full h-full object-cover mix-blend-multiply ${selectedImageIndex !== index && 'opacity-60'}`} />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Right column: Details */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          {product.category && (
            <span className="text-xs font-bold tracking-wider uppercase text-secondary-dark mb-3">
              {product.category.name}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-primary-dark mb-4">{product.name}</h1>
          <p className="text-3xl text-outline mb-4">${Number(product.price).toFixed(2)}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-dim border border-outline-variant/50 text-xs font-medium text-on-surface-variant">
              <span>🌱</span> Eco-friendly
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-dim border border-outline-variant/50 text-xs font-medium text-on-surface-variant">
              <span>⭐</span> Calidad Premium
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-dim border border-outline-variant/50 text-xs font-medium text-on-surface-variant">
              <span>🚚</span> Envíos a todo el país
            </span>
          </div>

          <div className="prose prose-sm text-on-surface-variant mb-12 leading-relaxed">
            <p>{product.description}</p>
          </div>



          <div className="bg-surface-dim/50 rounded-2xl p-6 mb-8 border border-outline-variant/30">
            <h3 className="text-sm font-bold text-primary-dark mb-4 flex items-center gap-2">
              ⚙️ Especificaciones Técnicas
            </h3>
            <ul className="space-y-3">
              {product.ancho && product.alto && product.profundidad && (
                <li className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Dimensiones (Ancho x Alto x Prof.)</span>
                  <span className="font-medium text-on-surface">{product.ancho} x {product.alto} x {product.profundidad} cm</span>
                </li>
              )}
              <li className="flex justify-between text-sm">
                <span className="text-on-surface-variant">Stock Disponible</span>
                <span className="font-medium text-on-surface">{product.stock} unidades</span>
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <Link href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block w-full">
              <Button variant="primary" size="lg" className="w-full bg-secondary hover:bg-secondary-dark text-on-secondary shadow-md h-16 text-lg group">
                <span className="flex items-center gap-3">
                  💬 Consultar por WhatsApp
                </span>
              </Button>
            </Link>
            <p className="text-xs text-center text-on-surface-variant mt-4 italic">
              Consultar por colores disponibles. Tenga en cuenta que al ser impresión 3D, puede haber leves variaciones en el acabado.
            </p>
          </div>


        </motion.div>
      </div>

      <ImageZoomModal
        isOpen={isZoomModalOpen}
        onClose={() => setIsZoomModalOpen(false)}
        images={allImagesUrls}
        initialIndex={selectedImageIndex}
        onIndexChange={(index) => setSelectedImageIndex(index)}
      />
    </div>
  );
}

