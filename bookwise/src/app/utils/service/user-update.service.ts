import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserUpdateRequest } from '../request/user-update.request';
import { UserUpdateResponse } from '../response/user-update.response';

@Injectable({
  providedIn: 'root'
})
export class UserUpdateService {

  constructor(private http: HttpClient) { }

  userUpdateService(user: UserUpdateRequest): Observable<any> {
    let url = 'http://localhost:5000/userUpdate';
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    let userUpdateServiceResponse = this.http.put<UserUpdateResponse>(url, user, { headers });
    return userUpdateServiceResponse
  }
}