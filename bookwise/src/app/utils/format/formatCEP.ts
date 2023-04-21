export function formatCEP(event: any) {
    let input = event.target.value;
    const cleanedCEP = input.replace(/\D/g, ''); 
    const formattedCEP = cleanedCEP.slice(0, 5) + '-' + cleanedCEP.slice(5, 8);
    return formattedCEP;
}
  
