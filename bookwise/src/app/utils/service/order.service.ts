import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrderItem {
  id: number;
  book_id: number;
  book_title: string;
  book_author: string;
  unit_price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: number;
  order_number: string;
  status: string;
  payment_status: string;
  subtotal: number;
  tax_amount: number;
  shipping_amount: number;
  discount_amount: number;
  total_amount: number;
  items: OrderItem[];
  tracking_number?: string;
  created_at: string;
  updated_at: string;
  shipped_at?: string;
  delivered_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  createOrder(paymentMethodId?: string, shippingAddressId?: number): Observable<any> {
    const body: any = {};
    if (paymentMethodId) body.payment_method_id = paymentMethodId;
    if (shippingAddressId) body.shipping_address_id = shippingAddressId;

    return this.http.post(`${this.apiUrl}/orders`, body, { headers: this.getHeaders() });
  }

  getUserOrders(page: number = 1, perPage: number = 10, status?: string): Observable<any> {
    let url = `${this.apiUrl}/orders?page=${page}&per_page=${perPage}`;
    if (status) url += `&status=${status}`;

    return this.http.get(url, { headers: this.getHeaders() });
  }

  getOrderDetails(orderId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders/${orderId}`, { headers: this.getHeaders() });
  }

  cancelOrder(orderId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders/${orderId}/cancel`, {}, { headers: this.getHeaders() });
  }

  // Admin methods (would need admin role check in real implementation)
  getAllOrders(page: number = 1, perPage: number = 20, status?: string): Observable<any> {
    let url = `${this.apiUrl}/admin/orders?page=${page}&per_page=${perPage}`;
    if (status) url += `&status=${status}`;

    return this.http.get(url, { headers: this.getHeaders() });
  }

  updateOrderStatus(orderId: number, status: string, trackingNumber?: string): Observable<any> {
    const body: any = { status };
    if (trackingNumber) body.tracking_number = trackingNumber;

    return this.http.put(`${this.apiUrl}/admin/orders/${orderId}`, body, { headers: this.getHeaders() });
  }
}