import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent {
  firstFormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
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
    secondCtrl: ['', Validators.required],
  });

  isLinear = false;

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

}
