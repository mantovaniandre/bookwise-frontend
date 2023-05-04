import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SearchZipCodeService } from '../utils/service/search-zip-code.service';
import { SearchCreditCardService } from '../utils/service/search-credit-card.service';
import { formatZipCode } from '../utils/format/format-zip-code';
import { formatCVV } from '../utils/format/format-cvv';
import { formatExpiration } from '../utils/format/format-expiration';
import { formatLettersOnly } from '../utils/format/format-letters-only';
import { formatPhoneNumber, formatRemoveSpaceInProhoneNumber } from '../utils/format/format-phone';
import { formatCPF } from '../utils/format/format-cpf';
import { formatCreditCardNumber } from '../utils/format/format-credit-card-number';
import { formatRemoveSpecialCharacters } from '../utils/format/format-remove-special-characters';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { capitalize } from '../utils/format/format-capitalize';
import { AuthService } from '../utils/service/auth.service';
import { formatOnlyNumber } from '../utils/format/format-only-number';
import { UserService } from '../utils/service/user.service';
import { UpdateUserRequest } from '../utils/request/user.request';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent {
  submitEnabled = false
  isLoading = true;
  
  constructor(private fb: FormBuilder,
              private searchCepService: SearchZipCodeService,
              private searchCreditCardService: SearchCreditCardService,
              private userService: UserService,
              private authService: AuthService) {}

  
  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
      const container = document.querySelector('.container');
      if (container) {
        container.classList.add('show');
      }
    }, 1000);
    const token = localStorage.getItem('token');
    if (token) {
      const UpdateUserRequest = { token: token };
      this.userService.profileUserService(UpdateUserRequest).subscribe((user: any) => {
        const mappingUserType: Record<number, string> = {
          1: "ADMIN",
          2: "CLIENT",
        };
        const mappingGender: Record<number, string> = {
          1: "MASCULINE",
          2: "FEMININE",
        };
        const user_type = mappingUserType[user.user['user_type_id']];
        const gender = mappingGender[user.user['gender_id']];
        if (user_type) {
          this.userForm.patchValue({ user_type: user_type });
        }
        if (gender) {
          this.userForm.patchValue({ gender: gender });
        }
        this.userForm.patchValue({
          first_name: capitalize(user.user['first_name']),
          last_name: capitalize(user.user['last_name']),
          email: user.user['email'].toLowerCase(),
          cpf: user.user['cpf'],
          phone: user.user['phone'],
          birthday: user.user['birthday'],
          zip_code: user.user.address['zip_code'],
          street: capitalize(user.user.address['street']),
          number: user.user.address['number'],
          complement: capitalize(user.user.address['complement']),
          neighborhood: capitalize(user.user.address['neighborhood']),
          city: capitalize(user.user.address['city']),
          state: user.user.address['state'],
          country:capitalize(user.user.address['country']),
          card_number: user.user.credit_card['card_number'],
          type_card: capitalize(user.user.credit_card['type_card']),
          flag: capitalize(user.user.credit_card['flag']),
          bank: capitalize(user.user.credit_card['bank']),
          country_bank: capitalize(user.user.credit_card['country_bank']),
          card_name: capitalize(user.user.credit_card['card_name']),
          expiration: user.user.credit_card['expiration'],
          cvv: user.user.credit_card['cvv'],
        });
      });
    } else {
      this.authService.logoutService()
    }
    this.userForm.markAllAsTouched();
  }
    
userForm = this.fb.group({
  first_name: ['', Validators.required],
  last_name: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  password: ['', Validators.required],
  cpf: ['', Validators.required],
  phone: ['', Validators.required],
  birthday: ['', Validators.required],
  user_type: ['', Validators.required],
  gender: ['', Validators.required],
  zip_code: ['', Validators.required],
  street: ['', Validators.required],
  number: ['', Validators.required],
  complement: ['', Validators.required],
  neighborhood: ['', Validators.required],
  city: ['', Validators.required],
  state: ['', Validators.required],
  country: ['', Validators.required],
  card_number: ['', Validators.required],
  type_card: ['', Validators.required],
  flag: ['', Validators.required],
  bank: ['', Validators.required],
  country_bank: ['', Validators.required],
  card_name: ['', Validators.required],
  expiration: ['', Validators.required],
  cvv: ['', Validators.required],
});

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

capitalize(str: string){
  capitalize(str)
}

formatAndSearchZipCode(event: any){
  let zipCodeFormatted = formatZipCode(event)
  this.searchCepService.searchCepService(zipCodeFormatted).subscribe(address => {
    this.userForm.patchValue({
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
  this.searchCreditCardService.searchCreditCardService(creditCardFormatted).subscribe(credit_card => {
    this.userForm.patchValue({
    type_card: credit_card.type,
    flag: credit_card.scheme,
    bank: credit_card.bank.name,
    country_bank: credit_card.country.name,
    });
  });
}

updateUser(){
    if(this.userForm.valid){

    let cpf = formatRemoveSpecialCharacters(this.userForm.get('cpf')?.value || '');
    let phone = formatRemoveSpaceInProhoneNumber(this.userForm.get('phone')?.value || '');
    let birthday = this.userForm.get('birthday')?.value || '';
    let street = formatRemoveSpecialCharacters(this.userForm.get('street')?.value || '');
    let complement = formatRemoveSpecialCharacters(this.userForm.get('complement')?.value || '');
    let neighborhood = formatRemoveSpecialCharacters(this.userForm.get('neighborhood')?.value || '');
    let city = formatRemoveSpecialCharacters(this.userForm.get('city')?.value || '');
    let state = formatRemoveSpecialCharacters(this.userForm.get('state')?.value || '');
    let country = formatRemoveSpecialCharacters(this.userForm.get('country')?.value || '');
    let type_card = formatRemoveSpecialCharacters(this.userForm.get('type_card')?.value || '');
    let flag = formatRemoveSpecialCharacters(this.userForm.get('flag')?.value || '');
    let bank = formatRemoveSpecialCharacters(this.userForm.get('bank')?.value || '');
    let country_bank = formatRemoveSpecialCharacters(this.userForm.get('country_bank')?.value || '');
    let zip_code = formatRemoveSpecialCharacters(this.userForm.get('zip_code')?.value || '');

    let user: UpdateUserRequest  = {
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
      number: this.userForm.get('number')?.value || '',
      complement: complement.toUpperCase() || '',
      neighborhood: neighborhood.toUpperCase() || '',
      city: city.toUpperCase(),
      state: state.toUpperCase() || '',
      country: country.toUpperCase() || '',
      card_number: this.userForm.get('card_number')?.value || '',
      type_card: type_card.toUpperCase() || '',
      flag: flag.toUpperCase() || '',
      bank: bank.toUpperCase() || '',
      country_bank: country_bank.toUpperCase() || '',
      card_name: this.userForm.get('card_name')?.value?.toUpperCase() || '',
      expiration: this.userForm.get('expiration')?.value || '',
      cvv: this.userForm.get('cvv')?.value || '',
    }
      this.userService.updateUserService(user).subscribe({
        next: (response: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Update Success!',
            text: response.message,
            timer: 3000
        }).then(() => {
          window.location.href = '/login';
          this.authService.logoutService()
        })
      },
        error: (error: HttpErrorResponse) => {
          Swal.fire({
            icon: 'error',
            title: 'Attention',
            text: error.error.message,
          });
        }
      });
    }
  }
}
