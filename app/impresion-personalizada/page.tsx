"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { useCategoryStore } from "@/store/useCategoryStore";
import { getWhatsAppGeneralLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { FileUpload } from "@/components/ui/FileUpload";
import { Card } from "@/components/ui/Card";
import { FileText, MessageCircle, PenTool, Truck, MessageCircleWarning } from "lucide-react";

type CustomPrintFormData = {
  description: string;
  useCase: string;
  referenceFile: File | null;
  name: string;
  email: string;
  whatsapp: string;
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};


export default function ImpresionPersonalizadaPage() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CustomPrintFormData>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const usoPrevistoOptions = useMemo(() => {
    const options = categories.map((cat) => ({
      value: cat.categoryId,
      label: cat.name,
    }));
    return [
      { value: "", label: "Selecciona una opción..." },
      ...options,
      { value: "otro", label: "Otro" },
    ];
  }, [categories]);

  const onSubmit = async (data: CustomPrintFormData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("description", data.description);
      formData.append("useCase", data.useCase);
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("whatsapp", data.whatsapp);

      if (data.referenceFile) {
        formData.append("referenceFile", data.referenceFile);
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

      const response = await fetch(`${apiUrl}/quotes`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al enviar el presupuesto");
      }

      const responseData = await response.json();

      toast.success("¡Presupuesto enviado exitosamente! Serás redirigido a WhatsApp.");
      reset(); // Limpiar formulario

      setTimeout(() => {
        window.open(getWhatsAppGeneralLink(), '_blank');
      }, 1500);

    } catch (error) {
      console.error("Error submitting quote:", error);
      toast.error("Ocurrió un error al enviar tu solicitud. Por favor intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-surface-container-lowest">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="flex flex-col gap-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-headline-lg-mobile md:text-headline-lg text-primary-dark">
                Haz realidad tu idea, nosotros nos encargamos del resto.
              </h1>
              <p className="text-body-lg text-on-surface-variant">
                ¿Tienes un concepto pero no sabes nada de 3D? No te preocupes. Describe lo que necesitas y nuestros expertos se encargarán del diseño, material y la impresión técnica por ti vía WhatsApp.
              </p>
            </motion.div>
            <motion.div
              className="w-full aspect-video rounded-xl bg-surface-container-high border border-outline-variant flex items-center justify-center overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/eleccion.jpg"
                alt="Ilustración de impresión personalizada"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            <h2 className="text-headline-md text-primary-dark">Cuéntanos sobre tu proyecto</h2>
            <div className="w-24 h-1 bg-secondary mx-auto mt-4 rounded-full" />
          </motion.div>

          <motion.div
            className="max-w-[48rem] mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUpVariant}
          >
            <Card className="p-6 sm:p-8 elevation-2">
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">

                {/* Description */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="description" className="text-label-md text-on-surface">
                    Describe tu proyecto
                  </label>
                  <p className="text-sm text-on-surface-variant mb-1">
                    ¿Qué quieres crear? No necesitas términos técnicos, solo explícanos su función o apariencia.
                  </p>
                  <Textarea
                    id="description"
                    placeholder="Ej: Quiero una figura decorativa de mi mascota que sirva para sujetar lápices..."
                    className="min-h-[120px]"
                    {...register("description", { required: "Este campo es obligatorio" })}
                  />
                  {errors.description && (
                    <span className="text-error text-sm">{errors.description.message}</span>
                  )}
                </div>

                {/* Use Case */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="useCase" className="text-label-md text-on-surface">
                    Uso previsto
                  </label>
                  <Select
                    id="useCase"
                    options={usoPrevistoOptions}
                    {...register("useCase", { required: "Selecciona un uso previsto" })}
                  />
                  {errors.useCase && (
                    <span className="text-error text-sm">{errors.useCase.message}</span>
                  )}
                </div>

                {/* File Upload */}
                <div className="flex flex-col gap-2">
                  <label className="text-label-md text-on-surface">
                    Sube una referencia
                  </label>
                  <p className="text-sm text-on-surface-variant mb-1">
                    ¿Tienes una foto, dibujo o esquema? Ayúdanos a visualizarlo mejor.
                  </p>
                  <Controller
                    control={control}
                    name="referenceFile"
                    render={({ field: { onChange } }) => (
                      <FileUpload
                        onFileSelect={(file) => onChange(file)}
                        accept="image/jpeg, image/png, image/webp, image/tiff"
                      />
                    )}
                  />
                </div>

                <div className="border-t border-outline-variant/30 my-2" />

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-label-md text-on-surface">
                      Nombre completo
                    </label>
                    <Input
                      id="name"
                      placeholder="Tu nombre"
                      {...register("name", { required: "Requerido" })}
                    />
                    {errors.name && (
                      <span className="text-error text-sm">{errors.name.message}</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-label-md text-on-surface">
                      Correo electrónico
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ejemplo@correo.com"
                      {...register("email", {
                        required: "Requerido",
                        pattern: { value: /^\S+@\S+$/i, message: "Correo inválido" }
                      })}
                    />
                    {errors.email && (
                      <span className="text-error text-sm">{errors.email.message}</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="whatsapp" className="text-label-md text-on-surface">
                      WhatsApp
                    </label>
                    <Input
                      id="whatsapp"
                      type="tel"
                      placeholder="+54 9 11 0000-0000"
                      {...register("whatsapp", { required: "Requerido" })}
                    />
                    {errors.whatsapp && (
                      <span className="text-error text-sm">{errors.whatsapp.message}</span>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <div className="flex flex-col items-center gap-4 mt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-[#895100] hover:bg-[#714200] text-white flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    <MessageCircleWarning className="w-5 h-5" />
                    {isSubmitting ? "Enviando solicitud..." : "Solicitar Presupuesto"}
                  </Button>
                  <p className="text-sm text-on-surface-variant italic">
                    El presupuesto y asesoramiento inicial son gratuitos.
                  </p>
                </div>
              </form>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 bg-surface-container-lowest">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            <h2 className="text-headline-md text-primary-dark">Cómo lo hacemos posible</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[64rem] mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUpVariant} className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-on-surface">1. Envías tu idea</h3>
              <p className="text-sm text-on-surface-variant">
                Describe qué necesitas en lenguaje sencillo mediante nuestro formulario.
              </p>
            </motion.div>

            <motion.div variants={fadeUpVariant} className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-on-surface">2. Asesoría Directa</h3>
              <p className="text-sm text-on-surface-variant">
                Hablamos por WhatsApp para definir materiales y detalles técnicos.
              </p>
            </motion.div>

            <motion.div variants={fadeUpVariant} className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
                <PenTool className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-on-surface">3. Producción</h3>
              <p className="text-sm text-on-surface-variant">
                Fabricamos tu pieza con la más alta precisión industrial.
              </p>
            </motion.div>

            <motion.div variants={fadeUpVariant} className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-on-surface">4. Recibe</h3>
              <p className="text-sm text-on-surface-variant">
                Envío seguro y rápido directamente a tu puerta.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
