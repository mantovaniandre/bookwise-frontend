export function formatDateOfBirth(event: any) {
    let input = event.target.value;
    input = input.replace(/\D/g, ''); // remove todos os caracteres que não são dígitos
    input = input.substring(0, 10); // permite apenas 10 dígitos
    input = input.replace(/(\d{2})(\d)/, '$1/$2'); // adiciona uma barra depois dos 2 primeiros dígitos
    input = input.replace(/(\d{2})(\d)/, '$1/$2'); // adiciona uma barra depois dos próximos 2 dígitos
  
    event.target.value = input;
}