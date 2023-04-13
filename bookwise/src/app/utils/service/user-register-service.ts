import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegisterRequest } from '../request/user-register-request';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {

  private url = 'http://localhost:5000/user/register';

  constructor(private http: HttpClient) { }

  registerUser(user: UserRegisterRequest): Observable<any> {
    return this.http.post<any>(this.url, user);
  }
}