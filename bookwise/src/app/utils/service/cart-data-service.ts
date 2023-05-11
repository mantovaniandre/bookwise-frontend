import { Injectable } from "@angular/core";
import { BooksCartModel } from "../response/book.response";

@Injectable({
    providedIn: 'root'
})
  export class CartDataService {
    private cartItems: BooksCartModel[] = [];
  
    constructor() {
      // Recupera os dados do carrinho do localStorage ao iniciar o serviço
      const storedCartItems = localStorage.getItem('cartItems');
      if (storedCartItems) {
        this.cartItems = JSON.parse(storedCartItems);
      }
    }
  
    addToCart(book: BooksCartModel): void {
        const existingItem = this.cartItems.find(item => item.id === book.id);
        if (existingItem) {
          existingItem.quantity += Number(book.quantity);
          existingItem.price = String(Number(existingItem.price) + (Number(book.price) * Number(book.quantity))); // Multiplica o preço pelo valor da quantidade
        } else {
          this.cartItems.push(book);
        }
        this.saveCartItems(); // Salva os dados do carrinho no localStorage
    }

    removeFromCart(book: BooksCartModel): void {
      const index = this.cartItems.indexOf(book);
      if (index !== -1) {
        this.cartItems.splice(index, 1);
        this.saveCartItems(); // Salva os dados do carrinho no localStorage
      }
    }
  
    clearCart(): void {
      this.cartItems = [];
      this.saveCartItems(); // Salva os dados do carrinho no localStorage
    }
  
    getCartItems(): BooksCartModel[] {
      return this.cartItems;
    }
  
    private saveCartItems(): void {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
  }
  