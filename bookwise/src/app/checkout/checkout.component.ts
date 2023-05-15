import { Component } from '@angular/core';
import { BooksCartModel } from '../utils/response/book.response';
import { UserService } from '../utils/service/user.service';
import { capitalize } from '../utils/format/format-capitalize';
import { FormBuilder } from '@angular/forms';
import { PurchaseService } from '../utils/service/purchase.service';
import { PurchaseRequest } from '../utils/request/purchase.request';
import Swal from 'sweetalert2';
import { CartDataService } from '../utils/service/cart-data-service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent{
  books: BooksCartModel[] = [];
  isLoading = true;
  buttonInvalidConfirm = true;

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

  constructor(private cartDataService: CartDataService,
              private userService: UserService,
              private fb: FormBuilder,
              private purchaseService: PurchaseService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
      const container = document.querySelector('.container');
      if (container) {
        container.classList.add('show');
      }
    }, 1000);

    this.books = this.cartDataService.getCartItems();
    console.log('removeFromCart')
    if (this.books.length === 0) {
      this.buttonInvalidConfirm = false;
    } else {
      this.buttonInvalidConfirm = true;
    }
    const token = localStorage.getItem('token');
    if (token) {
      const UpdateUserRequest = { token: token };
      this.userService.profileUserService(UpdateUserRequest).subscribe((user: any) => {
        this.userForm.patchValue({
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

  confirm() {
    let purchases: PurchaseRequest[] = [];
    for (let book of this.books) {
      let purchase: PurchaseRequest = {
        id: book.id,
        quantity: book.quantity,
        price: book.price,
      };
      purchases.push(purchase);
    }
    this.purchaseService.purchaseService(purchases).subscribe(
      (response) => {
        let successfulPurchases = response.successful_purchases;
        if (successfulPurchases.length > 0) {
          let successMessage = 'Successfully purchased book:';
          for (let purchase of successfulPurchases) {
            successMessage += `\n ${purchase.book_title}`;
          }
          Swal.fire('Sucesso', successMessage, 'success').then(() => {
            let failedPurchases = response.failed_purchases;
            if (failedPurchases.length > 0) {
              let errorMessage = 'Book purchase error:';
              for (let purchase of failedPurchases) {
                errorMessage += `\n ${purchase.book_title}`;
              }
              Swal.fire('Erro', errorMessage, 'error').then(() => {
                this.cartDataService.clearCart();
                location.reload();
              });
            } else {
              this.cartDataService.clearCart();
              location.reload();
            }
          });
        } else {
          let failedPurchases = response.failed_purchases;
          if (failedPurchases.length > 0) {
            let errorMessage = 'Book purchase error:';
            for (let purchase of failedPurchases) {
              errorMessage += `\n ${purchase.book_title}`;
            }
            Swal.fire('Erro', errorMessage, 'error').then(() => {
              this.cartDataService.clearCart();
              location.reload();
            });
          } else {
            this.cartDataService.clearCart();
            location.reload();
          }
        }
      },
      (error) => {
        Swal.fire('Error', 'There was an error with the purchase', 'error').then(() => {
          location.reload();
        });
      }
    );
  }
  
  
  
  
  

  
  
  
}
