import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateBookResponse, DeleteBookByIdResponse, GetAllBooksResponse, GetBookByIdResponse, SearchBooksResponse, UpdateBookByIdResponse } from '../response/book.response';
import { CreateBookRequest, DeleteBookByIdRequest, GetBookByIdRequest, SearchBooksRequest, UpdateBooksByIdRequest } from '../request/book.request';


@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  getAllBooksService(page: number = 1, perPage: number = 20): Observable<any> {
    let url = `http://localhost:5000/api/books?page=${page}&per_page=${perPage}`;
    let getAllBooksResponse = this.http.get<GetAllBooksResponse>(url);
    return getAllBooksResponse
  }

  getBookByIdService(id: GetBookByIdRequest): Observable<any> {
    let url = `http://localhost:5000/api/books/${id.id}`;
    let getBookByIdResponse = this.http.get<GetBookByIdResponse>(url);
    return getBookByIdResponse
  }

  getBookBySlugService(slug: string): Observable<any> {
    let url = `http://localhost:5000/api/books/slug/${slug}`;
    return this.http.get(url);
  }

  getFeaturedBooks(): Observable<any> {
    let url = 'http://localhost:5000/api/books/featured';
    return this.http.get(url);
  }

  getBestsellers(): Observable<any> {
    let url = 'http://localhost:5000/api/books/bestsellers';
    return this.http.get(url);
  }

  getCategories(): Observable<any> {
    let url = 'http://localhost:5000/api/categories';
    return this.http.get(url);
  }

  createBook(book: CreateBookRequest): Observable<any> {
    let url = `http://localhost:5000/api/books`;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
      let createBookResponse = this.http.post<CreateBookResponse>(url, book, { headers });
    return createBookResponse
  }

  updateBookByIdService(book: UpdateBooksByIdRequest, id: GetBookByIdRequest): Observable<any> {
    let url = `http://localhost:5000/api/books/${id.id}`;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
      let updateBookByIdResponse = this.http.put<UpdateBookByIdResponse>(url, book, { headers });
    return updateBookByIdResponse
  }

  deleteBookByIdService(id: DeleteBookByIdRequest): Observable<any> {
    let url = `http://localhost:5000/api/books/${id.id}`;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
      let deleteBookByIdService = this.http.delete<DeleteBookByIdResponse>(url, { headers });
    return deleteBookByIdService
  }

  searchBooks(request: SearchBooksRequest): Observable<any> {
    let url = `http://localhost:5000/api/books/search?option=${request.option}&term=${request.term}`;
    let searchBooksResponse = this.http.get<SearchBooksResponse>(url);
    return searchBooksResponse
  }
  
}