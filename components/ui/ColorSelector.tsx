import React from 'react';
import { Filament, Color } from '../../lib/api';

interface ColorSelectorProps {
  filaments: Filament[];
  requiredGrams: number;
  value?: string;
  selectedColor?: Color;
  onChange: (filamentId: string, color: Color) => void;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({ filaments, requiredGrams, value, selectedColor, onChange }) => {
  if (!filaments || filaments.length === 0) return null;

  // Obtener una lista única de todos los colores asociados a los filamentos
  const allColors = Array.from(
    new Map(
      filaments.flatMap(fil => (fil.colors || []).map(color => [color.colorId, color]))
    ).values()
  );

  // Obtener el filamento seleccionado (si hay uno) para mostrar el texto abajo y validar selecciones
  const selectedFilament = filaments.find(f => f.filamentId === value);

  return (
    <div className="space-y-3 mb-6">
      <h4 className="text-sm font-bold text-on-surface">Seleccionar Color (Filamento)</h4>
      <div className="flex flex-wrap gap-3">
        {allColors.map((color) => {
          // Un color está disponible si al menos un filamento que lo tiene posee la cantidad requerida
          const availableFilament = filaments.find(
            (fil) => fil.cantidadGramos >= requiredGrams && (fil.colors || []).some(c => c.colorId === color.colorId)
          );
          const isAvailable = !!availableFilament;
          
          // Ver si el filamento seleccionado actualmente tiene este color
          const isSelected = selectedFilament && (selectedFilament.colors || []).some(c => c.colorId === color.colorId);

          return (
            <button
              key={color.colorId}
              type="button"
              disabled={!isAvailable}
              onClick={() => isAvailable && availableFilament && onChange(availableFilament.filamentId, color)}
              className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all ${isSelected ? 'ring-2 ring-primary ring-offset-2 scale-110' : 'hover:scale-105 border border-outline-variant'} ${!isAvailable ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer shadow-sm'}`}
              style={{ backgroundColor: color.hexCode }}
              title={`${color.nombre} (${color.hexCode}) ${!isAvailable ? ' - Sin stock suficiente' : ''}`}
            >
              {!isAvailable && (
                <div className="absolute inset-0 flex items-center justify-center rounded-full overflow-hidden">
                  <div className="w-[120%] h-0.5 bg-red-500 rotate-45 transform origin-center"></div>
                </div>
              )}
            </button>
          );
        })}
      </div>
      {value && selectedColor && (
        <p className="text-xs text-on-surface-variant font-medium">
          Seleccionado: {selectedColor.nombre}
        </p>
      )}
    </div>
  );
};
