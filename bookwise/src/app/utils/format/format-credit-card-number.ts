export function formatCreditCardNumber(event: any) {
  let creditCardNumber = event.target.value;
  creditCardNumber = creditCardNumber.replace(/\D/g, '');
  creditCardNumber = creditCardNumber.match(/.{1,4}/g)?.join(' ') || '';
  return event.target.value = creditCardNumber;
}
