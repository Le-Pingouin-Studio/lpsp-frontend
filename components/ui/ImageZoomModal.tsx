import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageZoomModalProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
}

export function ImageZoomModal({ 
  images, 
  initialIndex = 0, 
  isOpen, 
  onClose,
  onIndexChange 
}: ImageZoomModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  
  // Sincronizar el índice si cambia la prop initialIndex cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  // Manejar teclado (Escape para cerrar, flechas para navegar)
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    // Prevenir scroll en el body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, currentIndex, images.length]);

  if (!isOpen || images.length === 0) return null;

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (images.length <= 1) return;
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    onIndexChange?.(newIndex);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (images.length <= 1) return;
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    onIndexChange?.(newIndex);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
      onClick={onClose}
    >
      {/* Botón Cerrar */}
      <button 
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-4 right-4 md:top-8 md:right-8 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-[110]"
        aria-label="Cerrar zoom"
      >
        <X size={24} />
      </button>

      {/* Navegación anterior */}
      {images.length > 1 && (
        <button 
          onClick={handlePrev}
          className="absolute left-4 md:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-[110]"
          aria-label="Imagen anterior"
        >
          <ChevronLeft size={32} />
        </button>
      )}

      {/* Imagen */}
      <div 
        className="relative w-full h-full p-4 md:p-12 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()} // Prevenir cerrar al hacer clic en la imagen
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={images[currentIndex]} // Key para forzar re-render de la animación por imagen
          src={images[currentIndex]}
          alt={`Imagen ${currentIndex + 1} en zoom`}
          className="max-w-full max-h-full object-contain select-none animate-in fade-in duration-300"
        />
      </div>

      {/* Navegación siguiente */}
      {images.length > 1 && (
        <button 
          onClick={handleNext}
          className="absolute right-4 md:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-[110]"
          aria-label="Imagen siguiente"
        >
          <ChevronRight size={32} />
        </button>
      )}

      {/* Indicador de número (ej: 1 / 3) */}
      {images.length > 1 && (
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-1.5 rounded-full text-white/80 text-sm tracking-widest pointer-events-none z-[110]">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
