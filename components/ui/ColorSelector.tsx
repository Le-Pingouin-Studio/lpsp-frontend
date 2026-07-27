import React from 'react';
import { Filament } from '../../lib/api';

interface ColorSelectorProps {
  filaments: Filament[];
  requiredGrams: number;
  value?: string;
  onChange: (filamentId: string) => void;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({ filaments, requiredGrams, value, onChange }) => {
  if (!filaments || filaments.length === 0) return null;

  return (
    <div className="space-y-3 mb-6">
      <h4 className="text-sm font-bold text-on-surface">Seleccionar Color (Filamento)</h4>
      <div className="flex flex-wrap gap-3">
        {filaments.map((fil) => {
          const isAvailable = fil.cantidadGramos >= requiredGrams;
          const isSelected = value === fil.filamentId;
          return (
            <button
              key={fil.filamentId}
              type="button"
              disabled={!isAvailable}
              onClick={() => isAvailable && onChange(fil.filamentId)}
              className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all ${isSelected ? 'ring-2 ring-primary ring-offset-2 scale-110' : 'hover:scale-105 border border-outline-variant'} ${!isAvailable ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer shadow-sm'}`}
              style={{ backgroundColor: fil.color }}
              title={`${fil.marca} - ${fil.modelo} (${fil.color}) ${!isAvailable ? ' - Sin stock suficiente' : ''}`}
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
      {value && (
        <p className="text-xs text-on-surface-variant font-medium">
          Seleccionado: {filaments.find(f => f.filamentId === value)?.marca} {filaments.find(f => f.filamentId === value)?.modelo}
        </p>
      )}
    </div>
  );
};
