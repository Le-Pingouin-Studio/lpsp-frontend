<div align="center">
  <img src="public/isologo.png" alt="Le Pingouin Studio Print Logo" width="200" />

  # Le Pingouin Studio Print - Frontend
  
  ![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react&logoColor=black)
  ![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?logo=next.js&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-%5E5-3178C6?logo=typescript&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-%5E4-38B2AC?logo=tailwind-css&logoColor=white)
  ![Framer Motion](https://img.shields.io/badge/Framer_Motion-%5E12.40.0-0055FF?logo=framer&logoColor=white)
  ![Zustand](https://img.shields.io/badge/Zustand-%5E5.0.14-5A3626)
  ![React Query](https://img.shields.io/badge/React_Query-%5E5.101.0-FF4154?logo=react-query&logoColor=white)
</div>

## 📖 Sobre el Proyecto

Este repositorio contiene la aplicación frontend para **Le Pingouin Studio Print**, un ecommerce/catálogo para productos de impresión 3D y servicios de impresión personalizada. La aplicación está construida con las últimas tecnologías web para garantizar un rendimiento óptimo, SEO y una experiencia de usuario fluida e interactiva.

## 🛠️ Tecnologías y Librerías

El proyecto utiliza el siguiente stack tecnológico principal:

- **Framework:** [Next.js](https://nextjs.org/) (v16.2.9)
- **Librería UI:** [React](https://react.dev/) (v19.2.4)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) (^5)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/) (^4)
- **Animaciones:** [Framer Motion](https://www.framer.com/motion/) (^12.40.0)
- **Manejo de Estado Global:** [Zustand](https://github.com/pmndrs/zustand) (^5.0.14)
- **Data Fetching:** [@tanstack/react-query](https://tanstack.com/query/latest) (^5.101.0)
- **Formularios:** [React Hook Form](https://react-hook-form.com/) (^7.80.0)
- **Iconos:** [Lucide React](https://lucide.dev/) (^1.20.0)
- **Notificaciones:** [React Hot Toast](https://react-hot-toast.com/) (^2.6.0)

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (v20 o superior recomendado)
- npm o yarn

### Pasos

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Le-Pingouin-Studio/lpsp-frontend.git
   ```

2. Instalar las dependencias:
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo (corre en el puerto 4000 por defecto):
   ```bash
   npm run dev
   ```

4. Abrir [http://localhost:4000](http://localhost:4000) con tu navegador para ver el resultado.

## 📁 Estructura del Proyecto

- `/app`: Rutas y páginas de Next.js (App Router).
- `/components`: Componentes de React reutilizables (UI, Layout, etc).
- `/lib`: Funciones de utilidad compartidas y configuración de API.
- `/public`: Activos estáticos como imágenes (ej. `isologo.png`), iconos, etc.
- `/store`: Manejo del estado global con Zustand (ej. Carrito, Categorías, Productos).

## 📜 Scripts Disponibles

- `npm run dev`: Inicia el servidor en modo desarrollo.
- `npm run build`: Compila la aplicación para producción.
- `npm run start`: Inicia el servidor de producción con los archivos compilados.
- `npm run lint`: Ejecuta ESLint para buscar errores en el código.
