import { Component } from '@angular/core';
import { BooksCartModel } from '../utils/response/book.response';
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { CartService } from '../utils/service/cart-service';
import { UserService } from '../utils/service/user.service';
import { UserModel } from '../utils/model/user.model';
import { capitalize } from '../utils/format/format-capitalize';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent{
  books: BooksCartModel[] = [];
  isLoading = true;

  userForm = this.fb.group({
    first_name:[''],
    last_name:[''],
    email: [''],
    password:[''],
    cpf:[''],
    phone:[''],
    birthday:[''],
    user_type:[''],
    gender:[''],
    zip_code:[''],
    street:[''],
    number:[''],
    complement:[''],
    neighborhood:[''],
    city:[''],
    state:[''],
    country:[''],
    card_number:[''],
    type_card:[''],
    flag:[''],
    bank:[''],
    country_bank:[''],
    card_name:[''],
    expiration:[''],
    cvv:[''],
  });

  constructor(private cartService: CartService,
              private userService: UserService,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
      const container = document.querySelector('.container');
      if (container) {
        container.classList.add('show');
      }
    }, 1000);

    this.books = this.cartService.getCartItems();
    const token = localStorage.getItem('token');
    if (token) {
      const UpdateUserRequest = { token: token };
      this.userService.profileUserService(UpdateUserRequest).subscribe((user: any) => {
        this.userForm.patchValue({
          first_name: capitalize(user.user['first_name']),
          last_name: capitalize(user.user['last_name']),
          email: user.user['email'].toLowerCase(),
          cpf: user.user['cpf'],
          phone: user.user['phone'],
          birthday: user.user['birthday'],
          zip_code: user.user.address['zip_code'],
          street: capitalize(user.user.address['street']),
          number: user.user.address['number'],
          complement: capitalize(user.user.address['complement']),
          neighborhood: capitalize(user.user.address['neighborhood']),
          city: capitalize(user.user.address['city']),
          state: user.user.address['state'],
          country:capitalize(user.user.address['country']),
          card_number: user.user.credit_card['card_number'],
          type_card: capitalize(user.user.credit_card['type_card']),
          flag: capitalize(user.user.credit_card['flag']),
          bank: capitalize(user.user.credit_card['bank']),
          country_bank: capitalize(user.user.credit_card['country_bank']),
          card_name: capitalize(user.user.credit_card['card_name']),
          expiration: user.user.credit_card['expiration'],
          cvv: user.user.credit_card['cvv'],
        });
      });
      console.log('this.userForm: ', this.userForm)
    }
  }



  capitalize(str: string){
    capitalize(str)
  }

  calculateTotal(): number {
    const uniqueBooks: BooksCartModel[] = [];
  
    for (let book of this.books) {
      const existingBook = uniqueBooks.find(b => b.id === book.id);
  
      if (!existingBook) {
        uniqueBooks.push({ ...book });
      }
    }
  
    let total = 0;
    for (let book of uniqueBooks) {
      const price = parseFloat(book.price);
      total += price;
    }
  
    return total;
  }
  
  
  
  
  

}
