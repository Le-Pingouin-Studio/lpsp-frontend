import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/Button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-outline-variant bg-surface/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/logotipo.png" 
            alt="Le Pingouin Studio Logo" 
            width={180} 
            height={48} 
            className="object-contain h-12 w-auto"
            priority
          />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/impresion-personalizada" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
            Impresión Personalizada
          </Link>
          <Link href="/contacto" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
            Contacto
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/catalogo">
            <Button variant="primary" size="sm">Ver Catálogo</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
