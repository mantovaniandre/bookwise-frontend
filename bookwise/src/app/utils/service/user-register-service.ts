import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegisterRequest } from '../request/user-register-request';
import { UserRegisterResponse } from '../response/user-register-response';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {

  constructor(private http: HttpClient) { }

  registerUserService(user: UserRegisterRequest): Observable<any> {
    let url = 'http://localhost:5000/register';
    let registerUserServiceResponse = this.http.post<UserRegisterResponse>(url, user);
    return registerUserServiceResponse
  }
}