


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfileResponse } from '../response/user-profile.response';
import { UserProfileRequest } from '../request/user-profile.request';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) { }

  userProfileService(token: UserProfileRequest): Observable<any> {
    let url = 'http://localhost:5000/profile';
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    const options = {headers}
    let userProfileServiceResponse = this.http.get<UserProfileResponse>(url, options);
    return userProfileServiceResponse
  }
}