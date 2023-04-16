import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenSubject = new BehaviorSubject<string>('');
  token$: Observable<string> = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(email: any, password: any): Observable<any> {
    return this.http.post('http://127.0.0.1:5000/login', { email, password }).pipe(
      tap((response: any) => {
        console.log('response: ', response);
        const token = response.token;
        localStorage.setItem('token', token);
        this.tokenSubject.next(token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next('');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
