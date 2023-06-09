import { Component } from '@angular/core';
import { FormBuilder, FormControl} from '@angular/forms';
import { UserService } from '../utils/service/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../utils/service/auth.service';
import { ProfileService } from '../utils/service/profile-service';

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
  searchOption = 'author';
  searchTerm!: string;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              private authService: AuthService,
              private profileService: ProfileService) { }
  
  search(){
    this.router.navigate(['/searchBook'], { queryParams: { option: this.searchOption, term: this.searchTerm } });
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token && this.router.url !== '/login') { // adicionando verificação da URL
      const UpdateUserRequest = { token: token };
      this.userService.profileUserService(UpdateUserRequest).subscribe((user: any) => {
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

  logoutService(){
    this.authService.logoutService()
  }

  checkout(): void {
    this.router.navigate(['/checkout']);
  }

}