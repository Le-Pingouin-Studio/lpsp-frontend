import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Le Pingouin Studio | Impresión 3D Profesional",
  description: "Servicio de impresión 3D de alta precisión y diseño de modelos a medida en Catriel, Río Negro. Cotiza tu proyecto con nosotros.",
  keywords: ["impresión 3D", "servicios 3D", "Catriel", "diseño 3D", "Rio Negro"],

  openGraph: {
    title: "Le Pingouin Studio | Impresión 3D Profesional",
    description: "Servicio de impresión 3D de alta precisión. Haz realidad tus ideas.",
    url: "https://lepingouinstudio.com.ar",
    siteName: "Le Pingouin Studio",
    images: [
      {
        url: "https://lepingouinstudio.com.ar/og-image.jpg",
        width: 1200,
        height: 630,
      }
    ],
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Toaster position="top-right" />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
