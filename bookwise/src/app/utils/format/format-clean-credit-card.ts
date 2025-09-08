export function formatCleanCreditCard(cardNumber: string): string {
  return cardNumber.replace(/\s/g, '').replace(/\D/g, '');
}