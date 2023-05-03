import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetAllBooksResponse } from '../response/get-all-books.response';
import { GetBookByIdResponse } from '../response/get-books-by-id.response';
import { GetBookByIdRequest } from '../request/get-books-by-id.request';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  getAllBooksService(): Observable<any> {
    let url = 'http://localhost:5000/getBooks';
    let getBookResponse = this.http.get<GetAllBooksResponse>(url);
    return getBookResponse
  }

  getBookByIdService(id: GetBookByIdRequest): Observable<any> {
    let url = `http://localhost:5000/getBookById/${id.id}`;
    let getBookResponse = this.http.get<GetBookByIdResponse>(url);
    return getBookResponse
  }
}