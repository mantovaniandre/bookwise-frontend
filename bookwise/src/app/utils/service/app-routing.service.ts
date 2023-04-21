import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../login/login.component';
import { UserRegisterComponent } from '../../user-register/user-register.component';
import { HomeComponent } from '../../home/home.component';
import { AuthGuard } from '../guard/auth.guard';
import { LearnMoreComponent } from 'src/app/learn-more/learn-more.component';
import { SearcBookComponent } from 'src/app/searc-book/searc-book.component';
import { MyAccountComponent } from 'src/app/my-account/my-account.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: UserRegisterComponent },
  { path: 'SearchBook', component: SearcBookComponent },
  { path: 'MyAccount', component: MyAccountComponent },
  { path: 'learnMore', component: LearnMoreComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
