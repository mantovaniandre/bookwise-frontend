import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../utils/service/auth.service';
import { Component} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginRequest } from '../utils/request/login.request';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private tokenSubject = new BehaviorSubject<string>('');
  token$: Observable<string> = this.tokenSubject.asObservable();
  disabledButton = true;
  
  loginFormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
                this.loginFormGroup.valueChanges.subscribe(() => {
                this.disabledButton = !this.loginFormGroup.valid;
              });}

  login(): void {
    this.disabledButton = true;
    const login: LoginRequest = {
      email: this.loginFormGroup.get('email')?.value || '',
      password: this.loginFormGroup.get('password')?.value || '',
    }
    
    if (this.loginFormGroup.valid && login) {
      this.authService.loginService(login).subscribe({
        next: (response: any) => {
          const token = response.token;
          const expirationTime = new Date().getTime() + 30000;

          localStorage.setItem('token', token);
          localStorage.setItem('expiration', expirationTime.toString());

          this.authService.logoutAfterTimeoutService();
          this.router.navigate(['/home']);
        
        },
        error: (error: HttpErrorResponse) => {
          //   Swal.fire({
          //     icon: 'error',
          //     title: 'Login error!',
          //     text: 'wrong email or password',
          // });
          this.disabledButton = false;
        }
      });
    }
  }
}

