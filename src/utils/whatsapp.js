import { formatCFA } from '../data/products'

// WhatsApp numbers in international format, digits only (no +, spaces, or leading 00).
export const STORE_WHATSAPP_NUMBER = '221781199613'
export const CONTACT_WHATSAPP_NUMBER = '221778208421'

export function buildWhatsAppLink(message, number = STORE_WHATSAPP_NUMBER) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export function buildOrderMessage({ items, total, customer }) {
  const lines = [
    'Bonjour Delvia Naturel, je souhaite passer la commande suivante :',
    '',
    ...items.map(
      (item) => `• ${item.qty} x ${item.name} (${item.format}) — ${formatCFA(item.price * item.qty)}`,
    ),
    '',
    `Total : ${formatCFA(total)}`,
    '',
    `Nom : ${customer.name || '-'}`,
    `Téléphone : ${customer.phone || '-'}`,
    `Adresse de livraison : ${customer.address || '-'}`,
  ]
  return lines.join('\n')
}
