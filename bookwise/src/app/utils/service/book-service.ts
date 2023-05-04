import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetAllBooksResponse } from '../response/get-all-books.response';
import { GetBookByIdResponse } from '../response/get-book-by-id.response';
import { GetBookByIdRequest } from '../request/get-books-by-id.request';
import { UpdateBooksByIdRequest } from '../request/update-book-by-id.request';
import { UpdateBookByIdResponse } from '../response/update-book-by-id.response';

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

  updateBookByIdService(book: UpdateBooksByIdRequest, id: GetBookByIdRequest): Observable<any> {
    let url = `http://localhost:5000/updateBookById/${id.id}`;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
      let updateBookResponse = this.http.put<UpdateBookByIdResponse>(url, book, { headers });
    return updateBookResponse
  }
}