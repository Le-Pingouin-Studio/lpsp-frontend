import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  message: string;
  label?: string;
  className?: string;
}

export function WhatsAppButton({ 
  message, 
  label = 'Consultar por WhatsApp',
  className = ''
}: WhatsAppButtonProps) {
  const phoneNumber = '+5492996895145';
  
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white transition-all bg-[#25D366] rounded-lg hover:bg-[#128C7E] shadow-md hover:shadow-lg ${className}`}
    >
      <MessageCircle className="w-5 h-5" />
      {label}
    </button>
  );
}
