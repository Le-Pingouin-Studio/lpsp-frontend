"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Truck } from 'lucide-react';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-surface-dim pt-16 pb-8 border-t border-outline-variant"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logotipo.png"
                alt="Le Pingouin Studio Logo"
                width={150}
                height={40}
                className="object-contain h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Transformamos tus ideas en realidad con impresión 3D de alta calidad.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-primary-dark mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:almendramalen@gmail.com" className="text-sm text-on-surface hover:text-primary transition-colors">
                  almendramalen@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href="https://wa.me/5492996895145" target="_blank" rel="noopener noreferrer" className="text-sm text-on-surface hover:text-primary transition-colors">
                  +54 9 299 689-5145
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-primary-dark mb-4">Ubicación</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm text-on-surface">
                  Catriel, Río Negro
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-primary" />
                <span className="text-sm text-on-surface">
                  Envíos a todo el país
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-primary-dark mb-4">Redes Sociales</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://www.instagram.com/lepingouinstudio/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-on-surface hover:text-primary transition-colors">
                  <InstagramIcon className="w-4 h-4 text-primary" />
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/share/1E8jDmmkAE/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-on-surface hover:text-primary transition-colors">
                  <FacebookIcon className="w-4 h-4 text-primary" />
                  Facebook
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-on-surface-variant">
            &copy; {new Date().getFullYear()} Le Pingouin Studio Print. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
