import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './utils/service/app-routing.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './utils/service/auth.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LearnMoreComponent } from './learn-more/learn-more.component';
import { SearchBookComponent } from './search-book/search-book.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { MyRequestsComponent } from './my-requests/my-requests.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Interceptor } from './utils/interceptors/interceptors';
import { NgxPaginationModule } from 'ngx-pagination';
import { CartComponent } from './cart/cart.component';
import { Interceptor } from './utils/interceptors/interceptors';



@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LearnMoreComponent,
    SearchBookComponent,
    MyAccountComponent,
    MyRequestsComponent,
    CheckoutComponent,
    UpdateBookComponent,
    CreateBookComponent,
    DashboardComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
