import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { formatCPF } from '../utils/format/format-cpf';
import { formatPhoneNumber, formatRemoveSpaceInProhoneNumber } from '../utils/format/format-phone';
import { formatZipCode } from '../utils/format/format-zip-code';
import { SearchZipCodeService } from '../utils/service/search-zip-code.service';
import { formatLettersOnly } from '../utils/format/format-letters-only';
import { formatExpiration } from '../utils/format/format-expiration';
import { formatCVV } from '../utils/format/format-cvv';
import { formatCreditCardNumber } from '../utils/format/format-credit-card-number';
import { SearchCreditCardService } from '../utils/service/search-credit-card.service';
import { formatRemoveSpecialCharacters } from '../utils/format/format-remove-special-characters';
import Swal from 'sweetalert2';
import { formatDateOfBirth } from '../utils/format/format-date-of-birthdate';
import { formatOnlyNumber } from '../utils/format/format-only-number';
import { UserService } from '../utils/service/user.service';
import { CreateUserRequest } from '../utils/request/user.request';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  linkUserNextEnabled = false;  
  linkAddressNextEnabled = false;
  linkSubmitEnabled = false;
  isLoading = true;
  
  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
      const container = document.querySelector('.container');
      if (container) {
        container.classList.add('show');
      }
    }, 1000);
  } 
  constructor(private fb: FormBuilder,
              private searchCepService: SearchZipCodeService,
              private searchCreditCardService: SearchCreditCardService,
              private userService: UserService) {}
  
  userForm = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    cpf: ['', Validators.required],
    phone: ['', Validators.required],
    birthday: ['', Validators.required],
    user_type: ['', Validators.required],
    gender: ['', Validators.required]
  });

  addressForm = this.fb.group({
    zip_code: ['', Validators.required],
    street: ['', Validators.required],
    number: ['', Validators.required],
    complement: ['', Validators.required],
    neighborhood: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    country: ['', Validators.required]
  });

  paymentForm = this.fb.group({
    card_number: ['', Validators.required],
    type_card: ['', Validators.required],
    flag: ['', Validators.required],
    bank: ['', Validators.required],
    country_bank: ['', Validators.required],
    card_name: ['', Validators.required],
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

  formatOnlyNumber(event: any){
    formatOnlyNumber(event)
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
    formatDateOfBirth(event)
  }

  formatAndSearchCreditCardNumber(event: any){
    let creditCardFormatted = formatCreditCardNumber(event)
    this.searchCreditCardService.searchCreditCardService(creditCardFormatted).subscribe(credit_card => {
      this.paymentForm.patchValue({
        type_card: credit_card.type,
        flag: credit_card.scheme,
        bank: credit_card.bank.name,
        country_bank: credit_card.country.name,
      });
    });
  }

  register(){
    if(this.userForm.valid && this.addressForm.valid && this.paymentForm.valid){

      let cpf = formatRemoveSpecialCharacters(this.userForm.get('cpf')?.value || '');
      let phone = formatRemoveSpaceInProhoneNumber(this.userForm.get('phone')?.value || '');
      let birthday = this.userForm.get('birthday')?.value || '';
      let street = formatRemoveSpecialCharacters(this.addressForm.get('street')?.value || '');
      let complement = formatRemoveSpecialCharacters(this.addressForm.get('complement')?.value || '');
      let neighborhood = formatRemoveSpecialCharacters(this.addressForm.get('neighborhood')?.value || '');
      let city = formatRemoveSpecialCharacters(this.addressForm.get('city')?.value || '');
      let state = formatRemoveSpecialCharacters(this.addressForm.get('state')?.value || '');
      let country = formatRemoveSpecialCharacters(this.addressForm.get('country')?.value || '');
      let type_card = formatRemoveSpecialCharacters(this.paymentForm.get('type_card')?.value || '');
      let flag = formatRemoveSpecialCharacters(this.paymentForm.get('flag')?.value || '');
      let bank = formatRemoveSpecialCharacters(this.paymentForm.get('bank')?.value || '');
      let country_bank = formatRemoveSpecialCharacters(this.paymentForm.get('country_bank')?.value || '');
      let zip_code = formatRemoveSpecialCharacters(this.addressForm.get('zip_code')?.value || '');

      let user: CreateUserRequest  = {
        first_name: this.userForm.get('first_name')?.value?.toUpperCase() || '',
        last_name: this.userForm.get('last_name')?.value?.toUpperCase() || '',
        email: this.userForm.get('email')?.value?.toUpperCase() || '',
        password: this.userForm.get('password')?.value || '',
        cpf: cpf || '',
        phone: phone || '',
        birthday: birthday,
        user_type: this.userForm.get('user_type')?.value?.toUpperCase() || '',
        gender: this.userForm.get('gender')?.value?.toUpperCase() || '',
        zip_code: zip_code || '',
        street: street.toUpperCase() || '',
        number: this.addressForm.get('number')?.value || '',
        complement: complement.toUpperCase() || '',
        neighborhood: neighborhood.toUpperCase() || '',
        city: city.toUpperCase(),
        state: state.toUpperCase() || '',
        country: country.toUpperCase() || '',
        card_number: this.paymentForm.get('card_number')?.value || '',
        type_card: type_card.toUpperCase() || '',
        flag: flag.toUpperCase() || '',
        bank: bank.toUpperCase() || '',
        country_bank: country_bank.toUpperCase() || '',
        card_name: this.paymentForm.get('card_name')?.value?.toUpperCase() || '',
        expiration: this.paymentForm.get('expiration')?.value || '',
        cvv: this.paymentForm.get('cvv')?.value || '',
      }
      this.userService.createUserService(user).subscribe({
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
          Swal.fire({
            icon: 'error',
            title: 'Registry error!',
            text: error.error.message,
          });
        }
      });
    }
  }
}

