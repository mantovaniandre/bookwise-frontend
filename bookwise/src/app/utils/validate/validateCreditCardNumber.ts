export function validateCreditCardNumber(event: any) {
  let cardNumber = event.target.value;
  cardNumber = cardNumber.replace(/\D/g, '');
  cardNumber = cardNumber.match(/.{1,4}/g)?.join(' ') || '';
  event.target.value = cardNumber;
}
