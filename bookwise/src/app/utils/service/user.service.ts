import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUserResponse, ProfileUserResponse, UpdateUserResponse } from '../response/user.response';
import { CreateUserRequest, ProfileUserRequest, UpdateUserRequest } from '../request/user.request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  profileUserService(token: ProfileUserRequest): Observable<any> {
    let url = 'http://localhost:5000/profileUser';
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    const options = {headers}
    let userProfileServiceResponse = this.http.get<ProfileUserResponse>(url, options);
    return userProfileServiceResponse
  }

  createUserService(user: CreateUserRequest): Observable<any> {
    let url = 'http://localhost:5000/createUser';
    let userCreateServiceResponse = this.http.post<CreateUserResponse>(url, user);
    return userCreateServiceResponse
  }

  updateUserService(user: UpdateUserRequest): Observable<any> {
    let url = 'http://localhost:5000/updateUser';
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    let updateUserResponse = this.http.put<UpdateUserResponse>(url, user, { headers });
    return updateUserResponse
  }
}