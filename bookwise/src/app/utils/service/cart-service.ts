import { Injectable } from '@angular/core';
import { BooksCartModel } from '../response/book.response';
import { CartDataService } from './cart-data-service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private cartDataService: CartDataService) { }

  addToCart(book: BooksCartModel): void {
    this.cartDataService.addToCart(book);
  }

  removeFromCart(book: BooksCartModel): void {
    this.cartDataService.removeFromCart(book);
  }

  clearCart(): void {
    this.cartDataService.clearCart();
  }

  getCartItems(): BooksCartModel[] {
    return this.cartDataService.getCartItems();
  }


}
