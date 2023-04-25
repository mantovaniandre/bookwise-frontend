export function formatCVV(event: any) {
  let cvv = event.target.value;
  cvv = cvv.replace(/\D/g, '');
  event.target.value = cvv;
}