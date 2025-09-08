import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface CartItem {
  id: number;
  book_id: number;
  book: any;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface Cart {
  id: number;
  items: CartItem[];
  total_amount: number;
  total_items: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:5000/api';
  private cartSubject = new BehaviorSubject<Cart | null>(null);
  public cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCart();
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  loadCart(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cart`, { headers: this.getHeaders() })
      .pipe(
        tap((response: any) => {
          if (response.success && response.data.cart) {
            this.cartSubject.next(response.data.cart);
          }
        }),
        catchError((error) => {
          console.error('Error loading cart:', error);
          // If cart fails to load from server, initialize empty cart
          this.cartSubject.next({
            id: 0,
            items: [],
            total_amount: 0,
            total_items: 0
          });
          throw error;
        })
      );
  }

  addToCart(bookId: number, quantity: number = 1): Observable<any> {
    const body = { book_id: bookId, quantity };
    return this.http.post(`${this.apiUrl}/cart/items`, body, { headers: this.getHeaders() })
      .pipe(
        tap((response: any) => {
          if (response.success) {
            // Reload cart after adding item
            this.loadCart().subscribe();
          }
        })
      );
  }

  updateCartItem(cartItemId: number, quantity: number): Observable<any> {
    const body = { quantity };
    return this.http.put(`${this.apiUrl}/cart/items/${cartItemId}`, body, { headers: this.getHeaders() })
      .pipe(
        tap((response: any) => {
          if (response.success) {
            // Reload cart after updating item
            this.loadCart().subscribe();
          }
        })
      );
  }

  removeFromCart(cartItemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart/items/${cartItemId}`, { headers: this.getHeaders() })
      .pipe(
        tap((response: any) => {
          if (response.success) {
            // Reload cart after removing item
            this.loadCart().subscribe();
          }
        })
      );
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart`, { headers: this.getHeaders() })
      .pipe(
        tap((response: any) => {
          if (response.success) {
            // Update cart subject with empty cart
            this.cartSubject.next({
              id: 0,
              items: [],
              total_amount: 0,
              total_items: 0
            });
          }
        })
      );
  }

  getCartCount(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cart/count`, { headers: this.getHeaders() });
  }

  // Get current cart value synchronously
  getCurrentCart(): Cart | null {
    return this.cartSubject.value;
  }

  // Helper method for legacy compatibility
  getCartItems(): any[] {
    const cart = this.getCurrentCart();
    return cart?.items || [];
  }
}
