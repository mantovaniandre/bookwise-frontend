import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component} from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.loginForm.valid) {
      // Processar o envio do formulário
      console.log(this.loginForm.value);
    } else {
      // Marcar os campos como tocados para mostrar os erros
      this.loginForm.markAllAsTouched();
    }
  }





}

