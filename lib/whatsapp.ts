const PHONE_NUMBER = '+5492996895145';

export function getWhatsAppProductLink(productName: string, productUrl: string): string {
  const message = `Hola! Me interesa consultar por el producto "${productName}".\nPuedes ver el producto aquí: ${productUrl}`;
  return `https://wa.me/${PHONE_NUMBER.replace('+', '')}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppGeneralLink(): string {
  const message = `Hola! Quiero hacer una consulta sobre los servicios de impresión 3D.`;
  return `https://wa.me/${PHONE_NUMBER.replace('+', '')}?text=${encodeURIComponent(message)}`;
}
