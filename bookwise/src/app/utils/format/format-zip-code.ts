export function formatZipCode(event: any) {
    let input = event.target.value;
    input = input.replace(/\D/g, '');
    input = input.replace(/^(\d{5})(\d)/, '$1-$2');
    return event.target.value = input.slice(0, 9);
}
  
  
  
