import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';
import { Router } from '@angular/router';
import { LoginResponse } from '../response/login.response';
import { LoginRequest } from '../request/login.request';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenSubject = new BehaviorSubject<string>(localStorage.getItem('token') || '');
  private logoutTimeoutId: any;

  constructor(private http: HttpClient, private router: Router) { }

  loginService(login: LoginRequest): Observable<any> {
    let url = 'http://127.0.0.1:5000/login'
    let loginResponse = this.http.post<LoginResponse>(url,login);
    return loginResponse;
  }

  logoutService(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    clearTimeout(this.logoutTimeoutId);
    this.logoutTimeoutId = null;
    this.tokenSubject.next('');
    this.router.navigate(['/login']);
  }

  isAuthenticatedService(): boolean {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    if (!token || !expiration) {
      return false;
    }
    return new Date().getTime() < +expiration;
  }

  logoutAfterTimeoutService(): void {
    this.logoutTimeoutId = setTimeout(() => {
      this.logoutService();
      this.router.navigate(['/login']);
    }, 1800000);
  }

  getToken(): string {
    const token = localStorage.getItem('token') || '';
    return token;
  }

}
