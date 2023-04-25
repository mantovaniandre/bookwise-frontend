import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreditCardNumberResponse } from '../response/credit-card-number.response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchCreditCardService {

  constructor(private http: HttpClient) { }

  searchCreditCardService(cardNumber: any): Observable<any> {
    let bin = cardNumber.replace(/\s/g, '').slice(0, 6);
    let url = `https://lookup.binlist.net/${bin}`;
    let searchCreditCardResponse = this.http.get<CreditCardNumberResponse>(url)
    return searchCreditCardResponse
  }
}




