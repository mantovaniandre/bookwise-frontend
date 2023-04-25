export function formatZipCode(event: any) {
    let input = event.target.value;
    input = input.replace(/\D/g, ''); // remove todos os caracteres que não são dígitos
    input = input.replace(/^(\d{5})(\d)/, '$1-$2'); // adiciona um traço depois dos primeiros 5 dígitos
    return event.target.value = input.slice(0, 9); // limita o número de caracteres para 9
}
  
  
  
