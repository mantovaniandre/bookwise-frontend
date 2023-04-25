export function formatNumberStreet(event: any){
  let input = event.target.value;
  input = input.replace(/[^0-9]/g, '');
  event.target.value = input; 
}
