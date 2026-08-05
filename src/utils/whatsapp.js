import { formatCFA } from '../data/products'

// WhatsApp numbers in international format, digits only (no +, spaces, or leading 00).
export const STORE_WHATSAPP_NUMBER = '221781199613'
export const CONTACT_WHATSAPP_NUMBER = '221778208421'

export function buildWhatsAppLink(message, number = STORE_WHATSAPP_NUMBER) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

const MAX_FIELD_LENGTH = 200

// Strips newlines/control chars and caps length so a customer field can't
// inject extra fake "lines" (e.g. a fake total) into the order message, and
// can't blow up the wa.me URL length.
function sanitizeField(value) {
  return (value || '')
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_FIELD_LENGTH)
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
    `Nom : ${sanitizeField(customer.name) || '-'}`,
    `Téléphone : ${sanitizeField(customer.phone) || '-'}`,
    `Adresse de livraison : ${sanitizeField(customer.address) || '-'}`,
  ]
  return lines.join('\n')
}
