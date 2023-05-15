import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PurchaseRequest } from '../request/purchase.request';


@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient) { }

  purchaseService(purchases: PurchaseRequest[]): Observable<any> {
    let url = `http://localhost:5000/createPurchase`;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  
    let createBookResponse = this.http.post(url, purchases, { headers });
    return createBookResponse;
  }

  getPurchaseService(): Observable<any> {
    let url = `http://localhost:5000/getPurchase`;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  
    let createBookResponse = this.http.get(url);
    return createBookResponse;
  }
  
}