import { Component, OnInit } from '@angular/core';

import { BooksCartModel } from '../utils/response/book.response';
import { CartService } from '../utils/service/cart-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: BooksCartModel[] = [];
  isLoading = true;

  constructor(private cartService: CartService,
              private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
      const container = document.querySelector('.container');
      if (container) {
        container.classList.add('show');
      }
    }, 1000);
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(book: BooksCartModel): void {
    this.cartService.removeFromCart(book);
  }

  clearOnlyCartComponent(): void {
    this.cartItems = []
  }

  checkout(): void {
    this.router.navigate(['/checkout'], { state: { books: this.cartItems } });
    this.clearOnlyCartComponent()
    
  }
}
