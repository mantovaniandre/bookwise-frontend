export function formatPhoneNumber(event: any) {
  let input = event.target.value;
  input = input.replace(/\D/g, ''); // remove todos os caracteres que não são dígitos
  input = input.replace(/^(\d{2})(\d)/g, '($1) $2'); // adiciona o código de área entre parênteses
  input = input.replace(/(\d{5})(\d)/, '$1-$2'); // adiciona um traço depois dos primeiros 5 dígitos

  if (input.length === 11 && input.charAt(2) === '9') { // adiciona o nono dígito
    input = input.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
  } else { // remove o nono dígito, se existir
    input = input.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }

  event.target.value = input.slice(0, 15); // limita o número de caracteres para 15
}



  
  

