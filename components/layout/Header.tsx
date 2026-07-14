"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when the menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-50 w-full border-b border-outline-variant bg-surface/80 backdrop-blur-md"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative z-50">
          <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
            <Image 
              src="/logotipo.png" 
              alt="Le Pingouin Studio Logo" 
              width={180} 
              height={48} 
              className="object-contain h-12 w-auto"
              priority
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/impresion-personalizada" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
              Impresión Personalizada
            </Link>
            <Link href="/contacto" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
              Contacto
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
            <Link href="/catalogo">
              <Button variant="primary" size="sm">Ver Catálogo</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-on-surface-variant hover:text-primary transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
              onClick={closeMenu}
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-surface shadow-xl z-50 p-6 pt-24 flex flex-col md:hidden"
            >
              <nav className="flex flex-col gap-6">
                <Link 
                  href="/impresion-personalizada" 
                  className="text-xl font-medium text-on-surface hover:text-primary transition-colors border-b border-outline-variant pb-4"
                  onClick={closeMenu}
                >
                  Impresión Personalizada
                </Link>
                <Link 
                  href="/contacto" 
                  className="text-xl font-medium text-on-surface hover:text-primary transition-colors border-b border-outline-variant pb-4"
                  onClick={closeMenu}
                >
                  Contacto
                </Link>
                
                <div className="mt-4">
                  <Link href="/catalogo" onClick={closeMenu}>
                    <Button variant="primary" className="w-full text-lg py-6">
                      Ver Catálogo
                    </Button>
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
