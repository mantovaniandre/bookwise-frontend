import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateBookResponse, GetAllBooksResponse, GetBookByIdResponse, UpdateBookByIdResponse } from '../response/book.response';
import { CreateBookRequest, GetBookByIdRequest, UpdateBooksByIdRequest } from '../request/book.request';


@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  getAllBooksService(): Observable<any> {
    let url = 'http://localhost:5000/getAllBooks';
    let getAllBooksResponse = this.http.get<GetAllBooksResponse>(url);
    return getAllBooksResponse
  }

  getBookByIdService(id: GetBookByIdRequest): Observable<any> {
    let url = `http://localhost:5000/getBookById/${id.id}`;
    let getBookByIdResponse = this.http.get<GetBookByIdResponse>(url);
    return getBookByIdResponse
  }

  createBook(book: CreateBookRequest): Observable<any> {
    let url = `http://localhost:5000/createBook`;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
      let createBookResponse = this.http.put<CreateBookResponse>(url, book, { headers });
    return createBookResponse
  }

  updateBookByIdService(book: UpdateBooksByIdRequest, id: GetBookByIdRequest): Observable<any> {
    let url = `http://localhost:5000/updateBookById/${id.id}`;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
      let updateBookByIdResponse = this.http.put<UpdateBookByIdResponse>(url, book, { headers });
    return updateBookByIdResponse
  }
  
}