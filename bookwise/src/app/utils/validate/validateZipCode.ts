export function validateZipCode(event: any) {
  let input = event.target.value;
  input = input.replace(/\D/g, ''); // Remove tudo que não for número
  if (input.length > 5) { // Se o CEP tiver 5 ou mais dígitos, insere o "-"
    input = `${input.substr(0, 5)}-${input.substr(5)}`;
  }
  event.target.value = input;
}
