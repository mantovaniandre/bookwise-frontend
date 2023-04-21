export function validateLastName(event: any) {
  let input = event.target.value;
  input = input.replace(/[^a-zA-Z\s]/g, '');
  event.target.value = input;
}
