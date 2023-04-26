import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SearchZipCodeService } from '../utils/service/search-zip-code.service';
import { SearchCreditCardService } from '../utils/service/search-credit-card.service';
import { formatZipCode } from '../utils/format/format-zip-code';
import { formatCVV } from '../utils/format/format-cvv';
import { formatExpiration } from '../utils/format/format-expiration';
import { formatLettersOnly } from '../utils/format/format-letters-only';
import { formatNumberStreet } from '../utils/format/format-number-street';
import { formatPhoneNumber } from '../utils/format/format-phone';
import { formatCPF } from '../utils/format/format-cpf';
import { formatCreditCardNumber } from '../utils/format/format-credit-card-number';
import { formatRemoveSpecialCharacters } from '../utils/format/format-remove-special-characters';
import { UserUpdateRequest } from '../utils/request/user-update.request';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { UserUpdateService } from '../utils/service/user-update.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent {
  isEditing: boolean = false;
  linkUserNextEnabled = false;  
  linkAddressNextEnabled = false;
  linkSubmitEnabled = false;

  constructor(private fb: FormBuilder,
    private searchCepService: SearchZipCodeService,
    private searchCreditCardService: SearchCreditCardService,
    private userUpdateService: UserUpdateService) {}

userForm = this.fb.group({
  firstName: ['', Validators.required],
  lastName: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  password: ['', Validators.required],
  cpf: ['', Validators.required],
  phone: ['', Validators.required],
  birthday: ['', Validators.required],
  usertype: ['', Validators.required],
  gender: ['', Validators.required]
});

addressForm = this.fb.group({
  zipCode: ['', Validators.required],
  street: ['', Validators.required],
  number: ['', Validators.required],
  complement: ['', Validators.required],
  neighborhood: ['', Validators.required],
  city: ['', Validators.required],
  state: ['', Validators.required],
  country: ['', Validators.required]
});

paymentForm = this.fb.group({
  cardNumber: ['', Validators.required],
  typeCard: ['', Validators.required],
  flag: ['', Validators.required],
  bank: ['', Validators.required],
  countryBank: ['', Validators.required],
  cardName: ['', Validators.required],
  expiration: ['', Validators.required],
  cvv: ['', Validators.required],
});

checkFormValidity() {
  if (this.userForm.valid) {
    this.linkUserNextEnabled = true; 
  } else {
    this.linkUserNextEnabled = false;
  }
  if(this.addressForm.valid){
    this.linkAddressNextEnabled = true
  }else{
    this.linkAddressNextEnabled = false
  }
  if(this.userForm.valid && this.addressForm.valid && this.paymentForm.valid){
    this.linkSubmitEnabled = true
  }else{
    this.linkSubmitEnabled = false
  }
}

formatCPF(event: any){
  formatCPF(event)
}

formatPhoneNumber(event: any){
  formatPhoneNumber(event)
}

formatNumberStreet(event: any){
  formatNumberStreet(event)
}

formatLettersOnly(event: any){
  formatLettersOnly(event)
}

formatExpiration(event: any){
  formatExpiration(event)
}

formatCVV(event: any){
  formatCVV(event)
}

formatAndSearchZipCode(event: any){
  let zipCodeFormatted = formatZipCode(event)
  this.searchCepService.searchCepService(zipCodeFormatted).subscribe(address => {
    this.addressForm.patchValue({
    street: address.logradouro,
    neighborhood: address.bairro,
    city: address.cidade,
    state: address.estado,
    country: "Brasil"
    });
  });
}

formatDateOfBirth(event: any){
  this.formatDateOfBirth(event)
}

formatAndSearchCreditCardNumber(event: any){
  let creditCardFormatted = formatCreditCardNumber(event)
  this.searchCreditCardService.searchCreditCardService(creditCardFormatted).subscribe(creditCard => {
    this.paymentForm.patchValue({
    typeCard: creditCard.type,
    flag: creditCard.scheme,
    bank: creditCard.bank.name,
    countryBank: creditCard.country.name,
    });
  });
}

update(){
  if(this.userForm.valid && this.addressForm.valid && this.paymentForm.valid){

    let cpf = formatRemoveSpecialCharacters(this.userForm.get('cpf')?.value || '');
    let phone = formatRemoveSpecialCharacters(this.userForm.get('phone')?.value || '');
    let birthday = this.userForm.get('birthday')?.value || '';
    let street = formatRemoveSpecialCharacters(this.addressForm.get('street')?.value || '');
    let complement = formatRemoveSpecialCharacters(this.addressForm.get('complement')?.value || '');
    let neighborhood = formatRemoveSpecialCharacters(this.addressForm.get('neighborhood')?.value || '');
    let city = formatRemoveSpecialCharacters(this.addressForm.get('city')?.value || '');
    let state = formatRemoveSpecialCharacters(this.addressForm.get('state')?.value || '');
    let country = formatRemoveSpecialCharacters(this.addressForm.get('country')?.value || '');
    let typeCard = formatRemoveSpecialCharacters(this.paymentForm.get('typeCard')?.value || '');
    let flag = formatRemoveSpecialCharacters(this.paymentForm.get('flag')?.value || '');
    let bank = formatRemoveSpecialCharacters(this.paymentForm.get('bank')?.value || '');
    let countryBank = formatRemoveSpecialCharacters(this.paymentForm.get('countryBank')?.value || '');
    let zipCode = formatRemoveSpecialCharacters(this.addressForm.get('zipCode')?.value || '');


    let user: UserUpdateRequest  = {
      firstName: this.userForm.get('firstName')?.value?.toUpperCase() || '',
      lastName: this.userForm.get('lastName')?.value?.toUpperCase() || '',
      email: this.userForm.get('email')?.value?.toUpperCase() || '',
      password: this.userForm.get('password')?.value || '',
      cpf: cpf || '',
      phone: '55' + phone || '',
      birthday: birthday,
      usertype: this.userForm.get('usertype')?.value?.toUpperCase() || '',
      gender: this.userForm.get('gender')?.value?.toUpperCase() || '',
      zipCode: zipCode || '',
      street: street.toUpperCase() || '',
      number: this.addressForm.get('number')?.value || '',
      complement: complement.toUpperCase() || '',
      neighborhood: neighborhood.toUpperCase() || '',
      city: city.toUpperCase(),
      state: state.toUpperCase() || '',
      country: country.toUpperCase() || '',
      cardNumber: this.paymentForm.get('cardNumber')?.value || '',
      typeCard: typeCard.toUpperCase() || '',
      flag: flag.toUpperCase() || '',
      bank: bank.toUpperCase() || '',
      countryBank: countryBank.toUpperCase() || '',
      cardName: this.paymentForm.get('cardName')?.value?.toUpperCase() || '',
      expiration: this.paymentForm.get('expiration')?.value || '',
      cvv: this.paymentForm.get('cvv')?.value || '',
    }
    this.userRegisterService.registerUserService(user).subscribe({
      next: (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Successful registration!',
          text: response.message,
          timer: 3000
      }).then(() => {
        window.location.href = '/login';
      })
    },
      error: (error: HttpErrorResponse) => {
        if (error.error.status == 400 && error.error.message == "Email already exists.") {
          Swal.fire({
            icon: 'error',
            title: 'Registry error!',
            text: 'Email already exists.',
          });
        } else if (error.error.message == `CPF ${user.cpf} already exists.`) {
          Swal.fire({
            icon: 'error',
            title: 'Registry error!',
            text: 'CPF already exists.',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Registry error!',
            text: 'An error occurred while registering the user. Please try again later.',
          });
        }
      }
    });
  }
}

}
