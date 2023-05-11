import { Injectable } from '@angular/core';
import { UserModel } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profile!: any;

  constructor() {
  }

  setProfile(profile: any): void {
    this.profile = profile;
  }

  getProfile(): any {
    return this.profile;
  }
}
