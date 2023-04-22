export function moveToNextStep(): void {
    const formSteps = document.getElementById("form-steps") as HTMLElement;
    if (!formSteps) return;
  
    // Mostra o primeiro card e esconde os outros
    const firstCard = formSteps.firstElementChild as HTMLElement | null;
    if (!firstCard) return;
    firstCard.classList.add("d-block");
  
    // Clica no botão "Próximo" para ir para o próximo card
    const nextButtons = document.querySelectorAll(".next");
    nextButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const currentCard = button.parentElement?.parentElement as HTMLElement | null;
        if (!currentCard) return;
        const nextCard = currentCard.nextElementSibling as HTMLElement | null;
        if (!nextCard) return;
        currentCard.classList.remove("d-block");
        currentCard.classList.add("d-none");
        nextCard.classList.remove("d-none");
        nextCard.classList.add("d-block");
      });
    });
  
    // Clica no botão "Anterior" para voltar para o card anterior
    const prevButtons = document.querySelectorAll(".prev");
    prevButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const currentCard = button.parentElement?.parentElement as HTMLElement | null;
        if (!currentCard) return;
        const prevCard = currentCard.previousElementSibling as HTMLElement | null;
        if (!prevCard) return;
        currentCard.classList.remove("d-block");
        currentCard.classList.add("d-none");
        prevCard.classList.remove("d-none");
        prevCard.classList.add("d-block");
      });
    });
}
  