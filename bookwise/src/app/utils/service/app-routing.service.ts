import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../login/login.component';
import { UserRegisterComponent } from '../../user-register/user-register.component';
import { HomeComponent } from '../../home/home.component';
import { AuthGuard } from '../guard/auth.guard';
import { LearnMoreComponent } from 'src/app/learn-more/learn-more.component';
import { SearchBookComponent } from 'src/app/search-book/search-book.component';
import { MyAccountComponent } from 'src/app/my-account/my-account.component';
import { MyRequestsComponent } from 'src/app/my-requests/my-requests.component';
import { CartComponent } from 'src/app/cart/cart.component';
import { CheckoutComponent } from 'src/app/checkout/checkout.component';
import { EditBookComponent } from 'src/app/edit-book/edit-book.component';
import { BookRegisterComponent } from 'src/app/book-register/book-register.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registerUser', component: UserRegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'myAccount', component: MyAccountComponent, canActivate: [AuthGuard] },
  { path: 'searchBook', component: SearchBookComponent },
  { path: 'learnMore/:id', component: LearnMoreComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'myRequests', component: MyRequestsComponent },
  { path: 'registerBook', component: BookRegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'editBook', component: EditBookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
