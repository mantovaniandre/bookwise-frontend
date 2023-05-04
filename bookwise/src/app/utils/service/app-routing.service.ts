import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../login/login.component';
import { CreateUserComponent } from '../../create-user/create-user.component';
import { HomeComponent } from '../../home/home.component';
import { AuthGuard } from '../guard/auth.guard';
import { LearnMoreComponent } from 'src/app/learn-more/learn-more.component';
import { SearchBookComponent } from 'src/app/search-book/search-book.component';
import { MyAccountComponent } from 'src/app/my-account/my-account.component';
import { MyRequestsComponent } from 'src/app/my-requests/my-requests.component';
import { CartComponent } from 'src/app/cart/cart.component';
import { CheckoutComponent } from 'src/app/checkout/checkout.component';
import { UpdateBookComponent } from 'src/app/update-book/update-book.component';
import { CreateBookComponent } from 'src/app/create-book/create-book.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'createrUser', component: CreateUserComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'myAccount', component: MyAccountComponent, canActivate: [AuthGuard] },
  { path: 'searchBook', component: SearchBookComponent, canActivate: [AuthGuard] },
  { path: 'learnMore/:id', component: LearnMoreComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'myRequests', component: MyRequestsComponent, canActivate: [AuthGuard] },
  { path: 'createBook', component: CreateBookComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'updateBook/:id', component: UpdateBookComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
