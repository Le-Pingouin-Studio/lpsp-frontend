'use client'
import React from 'react';
import { getWhatsAppGeneralLink } from '@/lib/whatsapp';
import { MessageCircle, Mail, Smartphone, HelpCircle, ChevronDown, ArrowRight } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

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

export default function ContactoPage() {
  return (
    <div className="bg-surface-container-lowest min-h-screen overflow-hidden">
      <div className="container px-4 py-16 mx-auto sm:px-6 lg:px-8 max-w-6xl">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
        >
          <h1 className="text-4xl font-bold text-on-surface mb-4">Contacto</h1>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
            Estamos aquí para ayudarte a hacer realidad tus proyectos 3D con precisión y materiales de alta calidad.
          </p>
        </motion.div>

        <div className="flex flex-col gap-16">
          {/* Top Section - FAQ */}
          <motion.div 
            className="w-full max-w-4xl mx-auto flex flex-col gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUpVariant} className="flex items-center justify-center gap-3 px-2 mb-2">
              <HelpCircle className="w-6 h-6 text-[#c0392b]" />
              <h3 className="text-2xl font-bold text-on-surface">Preguntas Frecuentes</h3>
            </motion.div>

            {/* FAQ Item 1 */}
            <motion.details variants={fadeUpVariant} className="group bg-surface p-6 rounded-2xl border border-outline-variant/30 shadow-sm hover:shadow-md transition-all">
              <summary className="flex items-center justify-between cursor-pointer list-none marker:hidden [&::-webkit-details-marker]:hidden">
                <h4 className="font-medium text-base text-on-surface group-hover:text-[#c0392b] transition-colors">¿Hacen envíos?</h4>
                <ChevronDown className="w-5 h-5 text-on-surface-variant group-hover:text-[#c0392b] transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="pt-4 mt-4 border-t border-outline-variant/30">
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Sí, enviamos a todo el país a través de correo argentino con seguimiento en tiempo real. Los plazos suelen ser de 3 a 5 días hábiles.
                </p>
              </div>
            </motion.details>

            {/* FAQ Item 2 */}
            <motion.details variants={fadeUpVariant} className="group bg-surface p-6 rounded-2xl border border-outline-variant/30 shadow-sm hover:shadow-md transition-all">
              <summary className="flex items-center justify-between cursor-pointer list-none marker:hidden [&::-webkit-details-marker]:hidden">
                <h4 className="font-medium text-base text-on-surface group-hover:text-[#c0392b] transition-colors">¿Qué materiales usan?</h4>
                <ChevronDown className="w-5 h-5 text-on-surface-variant group-hover:text-[#c0392b] transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="pt-4 mt-4 border-t border-outline-variant/30">
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Trabajamos con PLA para artículos de decoración, prototipos, etc. Para piezas mecánicas, usamos PETG, ABS y TPU, también disponemos de Híbridos (PLA-CF, PETG-CF) según la necesidad técnica del proyecto.
                </p>
              </div>
            </motion.details>

            {/* FAQ Item 3 */}
            <motion.details variants={fadeUpVariant} className="group bg-surface p-6 rounded-2xl border border-outline-variant/30 shadow-sm hover:shadow-md transition-all">
              <summary className="flex items-center justify-between cursor-pointer list-none marker:hidden [&::-webkit-details-marker]:hidden">
                <h4 className="font-medium text-base text-on-surface group-hover:text-[#c0392b] transition-colors">¿Tienen venta por mayor?</h4>
                <ChevronDown className="w-5 h-5 text-on-surface-variant group-hover:text-[#c0392b] transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="pt-4 mt-4 border-t border-outline-variant/30">
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Sí, contamos con precios especiales para pedidos mayoristas o producciones en serie de piezas personalizadas. Consulta vía WhatsApp para cotizaciones por volumen.
                </p>
              </div>
            </motion.details>
          </motion.div>

          {/* Bottom Section - Contact Methods */}
          <motion.div 
            className="w-full border-t border-outline-variant/30 pt-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUpVariant} className="text-center mb-10">
              <h3 className="text-2xl font-bold text-on-surface">Canales de Atención Directa</h3>
              <p className="text-on-surface-variant mt-2">Elige el medio que te sea más cómodo para comunicarte con nosotros.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* WhatsApp Card */}
              <motion.div variants={fadeUpVariant} className="bg-surface p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col items-center text-center gap-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center gap-3">
                  <div className="p-3 bg-[#f39c12]/10 text-[#f39c12] rounded-full">
                    <MessageCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-on-surface">WhatsApp</h3>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Respuesta rápida para presupuestos personalizados, consultas técnicas y seguimiento de pedidos.
                  </p>
                </div>
                <a href={getWhatsAppGeneralLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center text-sm font-medium text-[#c0392b] hover:text-[#e74c3c] transition-colors mt-auto">
                  Escríbenos ahora <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </motion.div>

              {/* Email Card */}
              <motion.div variants={fadeUpVariant} className="bg-surface p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col items-center text-center gap-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center gap-3">
                  <div className="p-3 bg-[#2c3e50]/10 text-[#2c3e50] rounded-full">
                    <Mail className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-on-surface">Correo Electrónico</h3>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Para proyectos complejos, archivos industriales o consultas comerciales.
                  </p>
                </div>
                <a href="mailto:almendramalen@gmail.com" className="text-sm font-medium text-on-surface hover:text-[#c0392b] transition-colors mt-auto break-all">
                  almendramalen@gmail.com
                </a>
              </motion.div>

              {/* Social Media Card */}
              <motion.div variants={fadeUpVariant} className="bg-surface p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col items-center text-center gap-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center gap-3">
                  <div className="p-3 bg-outline-variant/20 text-on-surface-variant rounded-full">
                    <Smartphone className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-on-surface">Redes Sociales</h3>
                </div>
                <div className="flex-1 w-full">
                  <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">
                    Síguenos para ver nuestros últimos trabajos y novedades en impresión 3D.
                  </p>
                  <div className="flex flex-col items-center gap-3">
                    <a href="https://www.instagram.com/lepingouinstudio/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-sm text-on-surface-variant hover:text-[#c0392b] transition-colors">
                      <InstagramIcon className="w-4 h-4" />
                      <span>@lepingouinstudio</span>
                    </a>
                    <a href="https://www.facebook.com/share/1E8jDmmkAE/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-sm text-on-surface-variant hover:text-[#c0392b] transition-colors">
                      <FacebookIcon className="w-4 h-4" />
                      <span>Le Pingouin Studio</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
