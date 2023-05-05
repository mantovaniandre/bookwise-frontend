import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateBookResponse, DeleteBookByIdResponse, GetAllBooksResponse, GetBookByIdResponse, UpdateBookByIdResponse } from '../response/book.response';
import { CreateBookRequest, DeleteBookByIdRequest, GetBookByIdRequest, UpdateBooksByIdRequest } from '../request/book.request';


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

  updateBookList(): Observable<any> {
    const url = 'http://localhost:5000/getAllBooks';
    return this.http.get<GetAllBooksResponse>(url);
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

  deleteBookByIdService(id: DeleteBookByIdRequest): Observable<any> {
    let url = `http://localhost:5000/deleteBookById/${id.id}`;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
      let deleteBookByIdService = this.http.delete<DeleteBookByIdResponse>(url, { headers });
    return deleteBookByIdService
  }
  
}