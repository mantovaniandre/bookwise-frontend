export function formatPhoneNumber(event: any) {
  let input = event.target.value;
  input = input.replace(/\D/g, '');
  input = input.replace(/^(\d{2})(\d)/g, '($1) $2');
  input = input.replace(/(\d{5})(\d)/, '$1-$2'); 

  if (input.length === 11 && input.charAt(2) === '9') {
    input = input.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
  } else {
    input = input.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  event.target.value = input.slice(0, 15);
}

export function formatRemoveSpaceInProhoneNumber(str: string): string {
  return str.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, ''); // <- adiciona esta linha
}



  
  

