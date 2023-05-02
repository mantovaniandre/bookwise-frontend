import { Component } from '@angular/core';
import { FormBuilder, FormControl} from '@angular/forms';
import { UserProfileService } from '../utils/service/user-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  selected = 'author';
  adminAccess = false;
  clientAccess = false;
  isLoading = true;
  isLoginPage!: boolean;

  constructor(private fb: FormBuilder,
              private userProfileService: UserProfileService,
              private router: Router) { }
  
  search(){
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      const userUpdateRequest = { token: token };
      this.userProfileService.userProfileService(userUpdateRequest).subscribe((user: any) => {
        const mappingUserType: Record<number, string> = {
          1: "ADMIN",
          2: "CLIENT",
        };
        const user_type = mappingUserType[user.user['user_type_id']];
        if (user_type == 'ADMIN'){
          this.adminAccess = true;
        }
        if (user_type == 'CLIENT'){
          this.clientAccess = true;
        }
      });
    }
    this.isLoading = false;
    this.isLoginPage = this.router.url === '/login';
  }

  myForm = this.fb.group({
    search: new FormControl('author')
  });

}
