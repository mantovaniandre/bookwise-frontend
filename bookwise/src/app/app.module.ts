import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserRegisterComponent } from './user-register/user-register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './utils/service/app-routing.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './utils/service/auth.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LearnMoreComponent } from './learn-more/learn-more.component';
import { SearchBookComponent } from './search-book/search-book.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { MyRequestsComponent } from './my-requests/my-requests.component';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [
    AppComponent,
    UserRegisterComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LearnMoreComponent,
    SearchBookComponent,
    MyAccountComponent,
    MyRequestsComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [AuthService, {
    provide: Window,
    useValue: window,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
