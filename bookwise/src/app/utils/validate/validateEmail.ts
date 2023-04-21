export function validateEmail(event: any): void {
  let emailIsValid: boolean = true;
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  const emailValue = event.target.value;
  emailIsValid = emailPattern.test(emailValue);
}