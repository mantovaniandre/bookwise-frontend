export function formatCPF(event: any) {
  let input = event.target.value;
  input = input.replace(/[^0-9]/g, ''); 
  if (input.length > 2) {
    input = input.slice(0, 2) + '/' + input.slice(2);
  }
  event.target.value = input;
}
  
