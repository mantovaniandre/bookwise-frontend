import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { map } from 'rxjs/operators';
import { BinListResponse } from 'src/app/utils/interface/binListResponse';
import { UserRegisterService } from '../utils/service/user-register-service';
import { UserRegisterRequest } from '../utils/request/user-register-request';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent {

  emailIsValid: boolean = true;

  firstFormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
    password: ['', Validators.required],
    cpf: ['', Validators.required],
    phone: ['', Validators.required],
    birthday: ['', Validators.required],
    usertype: ['', Validators.required],
    gender: ['', Validators.required]
  });

  secondFormGroup = this.fb.group({
    zipCode: ['', Validators.required],
    street: ['', Validators.required],
    number: ['', Validators.required],
    complement: ['', Validators.required],
    neighborhood: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    country: ['', Validators.required]
  });
  
  thirdFormGroup = this.fb.group({
    cardNumber: ['', Validators.required],
    typeCard: ['', Validators.required],
    flag: ['', Validators.required],
    bank: ['', Validators.required],
    countryBank: ['', Validators.required],
    cardName: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ]+([ ]{1}[a-zA-ZÀ-ÿ]+)*$/)]],
    expiration: ['', Validators.required],
    cvv: ['', Validators.required],
  });

  isLinear = false;

  emailFormControl = this.firstFormGroup.get('email');

  constructor(private fb: FormBuilder, private http: HttpClient, private userRegisterService: UserRegisterService) {}

  searchCep() {
    const zipCode = this.secondFormGroup.controls.zipCode.value;
    this.http.get(`https://viacep.com.br/ws/${zipCode}/json/`).subscribe((data: any) => {
      if (data.erro) {
        console.log('CEP inválido!');
        return;
      }

      this.secondFormGroup.patchValue({
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf,
        country: 'Brasil'
      });
    });
  }

  searchCreditCard(cardNumber: any) {
    let bin = cardNumber.replace(/\s/g, '').slice(0, 6);
    return this.http.get<BinListResponse>(`https://lookup.binlist.net/${bin}`)
      .pipe(
        map((response: any)  => {
          if(!response.error){
            this.thirdFormGroup.patchValue({
              typeCard: response['type'],
              flag : response['scheme'],
              bank: response.bank.name,
              countryBank: response['country']['name'],
            })
          }
        })
      ).subscribe();    
  }

  validateCreditCardNumber(event: any) {
    let cardNumber = event.target.value;
    cardNumber = cardNumber.replace(/\D/g, '');
    cardNumber = cardNumber.match(/.{1,4}/g)?.join(' ') || '';
    event.target.value = cardNumber;
    this.searchCreditCard(cardNumber)
  }

  validateCvv(event: any) {
    let cvv = event.target.value;
    cvv = cvv.replace(/\D/g, '');
    event.target.value = cvv;
  }

  formatExpiration(event: any) {
    let input = event.target.value;
    input = input.replace(/[^0-9]/g, ''); 
    if (input.length > 2) {
      input = input.slice(0, 2) + '/' + input.slice(2);
    }
    event.target.value = input;
  }

  validateNumberStreet(event: any){
    let input = event.target.value;
    input = input.replace(/[^0-9]/g, '');
    event.target.value = input; 
  }

  formatPhone(event: any) {
    let phone = event.target.value;
    phone = phone.replace(/\D/g, ''); // Remove caracteres não numéricos
    phone = phone.replace(/^(\d{2})(\d)/g, '($1) $2'); // Formata o DDD e o primeiro dígito
    phone = phone.replace(/(\d)(\d{4})$/, '$1-$2'); // Formata os últimos quatro dígitos
    event.target.value = phone;
  }

  formatCPF(event: any) {
    let cpf = event.target.value;
    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o primeiro ponto
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o segundo ponto
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona o traço
    event.target.value = cpf;
  }

  validateEmail(event: any): void {
    console.log('event: ', event)
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    console.log('emailPattern: ', emailPattern)
    const emailValue = event.target.value;
    console.log('event.target.value: ', event.target.value)
    this.emailIsValid = emailPattern.test(emailValue);
    console.log('emailIsValid: ', this.emailIsValid)
  }

  validateZipCode(event: any){
    let input = event.target.value;
    input = input.replace(/[^0-9]/g, '');
    event.target.value = input; 
  }

  formatCEP(event: any) {
    let input = event.target.value;
    const cleanedCEP = input.replace(/\D/g, ''); // remove tudo que não é número
    const formattedCEP = cleanedCEP.slice(0, 5) + '-' + cleanedCEP.slice(5, 8); // adiciona os hifens
    return formattedCEP;
  }
  

  formatCharacter(event: any) {
    let input = event.target.value;
    input = input.replace(/[^a-zA-Z\s]/g, '');
    return event.target.value = input;
  }

  validateLastName(event: any) {
    let input = event.target.value;
    input = input.replace(/[^a-zA-Z\s]/g, '');
    event.target.value = input;
  }
  
  validateCardName(event: any) {
    let input = event.target.value;
    input = input.replace(/[^a-zA-Z\s]/g, '');
    event.target.value = input;
  }

  removeSpecialCharacters(str: string): string {
    return str.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/gi, '');
  }

  formatDate(date: string) {
    const dateValue: string | null = date;
    const formattedDate: string | null = dateValue ? new Date(dateValue).toLocaleDateString('pt-BR') : null;
    return formattedDate;
  }

  removeSpecialCharsAndJoinNumbers(str: string): string {
    return str.replace(/\D/g, '');
  }
  
  register(){
    if(this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid){
      
      let cpf = this.removeSpecialCharacters(this.firstFormGroup.get('cpf')?.value || '');
      let phone = this.removeSpecialCharsAndJoinNumbers(this.firstFormGroup.get('phone')?.value || '');
      let birthday = this.formatDate(this.firstFormGroup.get('birthday')?.value || '');
      let street = this.removeSpecialCharacters(this.secondFormGroup.get('street')?.value || '');
      let complement = this.removeSpecialCharacters(this.secondFormGroup.get('complement')?.value || '');
      let neighborhood = this.removeSpecialCharacters(this.secondFormGroup.get('neighborhood')?.value || '');
      let city = this.removeSpecialCharacters(this.secondFormGroup.get('city')?.value || '');
      let state = this.removeSpecialCharacters(this.secondFormGroup.get('state')?.value || '');
      let country = this.removeSpecialCharacters(this.secondFormGroup.get('country')?.value || '');
      let typeCard = this.removeSpecialCharacters(this.thirdFormGroup.get('typeCard')?.value || '');
      let flag = this.removeSpecialCharacters(this.thirdFormGroup.get('flag')?.value || '');
      let bank = this.removeSpecialCharacters(this.thirdFormGroup.get('bank')?.value || '');
      let countryBank = this.removeSpecialCharacters(this.thirdFormGroup.get('countryBank')?.value || '');


      let user: UserRegisterRequest  = {
        firstName: this.firstFormGroup.get('firstName')?.value?.toUpperCase() || '',
        lastName: this.firstFormGroup.get('lastName')?.value?.toUpperCase() || '',
        email: this.firstFormGroup.get('email')?.value?.toUpperCase() || '',
        password: this.firstFormGroup.get('password')?.value || '',
        cpf: cpf || '',
        phone: '55' + phone || '',
        birthday: birthday,
        usertype: this.firstFormGroup.get('usertype')?.value?.toUpperCase() || '',
        gender: this.firstFormGroup.get('gender')?.value?.toUpperCase() || '',
        zipCode: this.secondFormGroup.get('zipCode')?.value || '',
        street: street.toUpperCase() || '',
        number: this.secondFormGroup.get('number')?.value || '',
        complement: complement.toUpperCase() || '',
        neighborhood: neighborhood.toUpperCase() || '',
        city: city.toUpperCase(),
        state: state.toUpperCase() || '',
        country: country.toUpperCase() || '',
        cardNumber: this.thirdFormGroup.get('cardNumber')?.value || '',
        typeCard: typeCard.toUpperCase() || '',
        flag: flag.toUpperCase() || '',
        bank: bank.toUpperCase() || '',
        countryBank: countryBank.toUpperCase() || '',
        cardName: this.thirdFormGroup.get('cardName')?.value?.toUpperCase() || '',
        expiration: this.thirdFormGroup.get('expiration')?.value || '',
        cvv: this.thirdFormGroup.get('cvv')?.value || '',
      }
      this.userRegisterService.registerUser(user).subscribe({
        next: (response: any) => {
          console.log(response);
          // Faça algo com a resposta do backend, como exibir uma mensagem de sucesso
        },
        error: (error: any) => {
          console.error(error);
          // Faça algo com o erro retornado pelo backend, como exibir uma mensagem de erro
        }
      });
    }
  }
   

}
function deburr(city: string): string {
  throw new Error('Function not implemented.');
}

function moment(dateValue: string) {
  throw new Error('Function not implemented.');
}

