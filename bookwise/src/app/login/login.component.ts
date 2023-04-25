import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../utils/service/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../utils/request/login.request';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  private tokenSubject = new BehaviorSubject<string>('');
	token$: Observable<string> = this.tokenSubject.asObservable();
	disabledButton = true;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {}


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

    login(): void {
    this.disabledButton = true;
    const login: LoginRequest = {
      email: this.loginForm.get('email')?.value || '',
      password: this.loginForm.get('password')?.value || '',
    }
    
    if (this.loginForm.valid && login) {
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

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }


}

