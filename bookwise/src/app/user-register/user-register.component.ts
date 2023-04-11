import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { map } from 'rxjs/operators';
import { BinListResponse } from 'src/app/utils/interface/binListResponse';

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

  constructor(private fb: FormBuilder, private http: HttpClient) {}

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

  validateFirstName(event: any) {
    let input = event.target.value;
    input = input.replace(/[^a-zA-Z\s]/g, '');
    event.target.value = input;
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
  
  
   

}
