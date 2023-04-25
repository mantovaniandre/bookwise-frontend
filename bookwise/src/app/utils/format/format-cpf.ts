export function formatCPF(event: any) {
  let input = event.target.value;
  input = input.replace(/\D/g, ''); // remove todos os caracteres que não são dígitos

  input = input.replace(/(\d{3})(\d)/, '$1.$2'); // adiciona um ponto depois dos 3 primeiros dígitos
  input = input.replace(/(\d{3})(\d)/, '$1.$2'); // adiciona um ponto depois dos próximos 3 dígitos
  input = input.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // adiciona um traço depois dos últimos 2 dígitos

  event.target.value = input;
}


