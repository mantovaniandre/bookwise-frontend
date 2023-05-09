import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../utils/service/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../utils/request/login.request';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading = true;
  loginForm!: FormGroup;
  private tokenSubject = new BehaviorSubject<string>('');
	token$: Observable<string> = this.tokenSubject.asObservable();
	disabledButton = true;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {}


  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
      const container = document.querySelector('.container');
      if (container) {
        container.classList.add('show');
      }
    }, 1000);
    
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
          const expirationTime = new Date().getTime() + 1800000;

          localStorage.setItem('token', token);
          localStorage.setItem('expiration', expirationTime.toString());

          this.authService.logoutAfterTimeoutService();
          this.router.navigate(['/home']);
        
        },
        error: (error: HttpErrorResponse) => {
          Swal.fire({
            icon: 'error',
            title: 'Login error!',
            text: error.error.message,
          });
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
