import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserCreateRequest } from '../request/user-create.request';
import { UserCreateResponse } from '../response/user-create.response';

@Injectable({
  providedIn: 'root'
})
export class UserCreateService {

  constructor(private http: HttpClient) { }

  userCreateService(user: UserCreateRequest): Observable<any> {
    let url = 'http://localhost:5000/userCreate';
    let userCreateServiceResponse = this.http.post<UserCreateResponse>(url, user);
    return userCreateServiceResponse
  }
}