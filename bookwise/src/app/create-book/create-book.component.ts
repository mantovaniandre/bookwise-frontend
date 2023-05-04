import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BooksService } from '../utils/service/book-service';
import { formatLettersOnly } from '../utils/format/format-letters-only';
import { formatOnlyNumber } from '../utils/format/format-only-number';
import { CreateBookRequest } from '../utils/request/book.request';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent {
  isEditing: boolean = false;

  constructor(private fb: FormBuilder, 
              private booksService: BooksService){}

  bookForm = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    year: ['', Validators.required],
    isbn: ['', Validators.required],
    edition: ['', Validators.required],
    origin: ['', Validators.required],
    book_format: ['', Validators.required],
    binding: ['', Validators.required],
    language: ['', Validators.required],
    country: ['', Validators.required],
    pages: ['', Validators.required],
    stock: ['', Validators.required],
    url_img: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    category: ['', Validators.required], 
  });

formatLettersOnly(event: any){
  formatLettersOnly(event)
}

formatOnlyNumber(event: any){
  formatOnlyNumber(event)
}


createBook(){

  if(this.bookForm.valid){

    let title = this.bookForm.get('title')?.value || ''.toUpperCase();
    let author = this.bookForm.get('author')?.value || ''.toUpperCase();
    let year = this.bookForm.get('year')?.value || ''.toUpperCase();
    let isbn = this.bookForm.get('isbn')?.value || ''.toUpperCase();
    let edition = this.bookForm.get('edition')?.value || ''.toUpperCase();
    let origin = this.bookForm.get('origin')?.value || ''.toUpperCase();
    let book_format = this.bookForm.get('book_format')?.value || ''.toUpperCase();
    let binding = this.bookForm.get('binding')?.value || ''.toUpperCase();
    let language = this.bookForm.get('language')?.value || ''.toUpperCase();
    let country = this.bookForm.get('country')?.value || ''.toUpperCase();
    let pages = this.bookForm.get('pages')?.value || ''.toUpperCase();
    let stock = this.bookForm.get('stock')?.value + ''.toUpperCase();
    let url_img = this.bookForm.get('url_img')?.value || ''.toUpperCase();
    let description = this.bookForm.get('description')?.value || ''.toUpperCase();
    let price = this.bookForm.get('price')?.value + ''.toUpperCase();
    let category = this.bookForm.get('category')?.value || ''.toUpperCase();
    
    let createBook: CreateBookRequest  = {
      title: title,
      author: author,
      year: year,
      isbn: isbn,
      edition: edition,
      origin: origin,
      book_format: book_format,
      binding: binding,
      language: language,
      country: country,
      pages: pages,
      stock: stock,
      url_img: url_img,
      description: description,
      price: price,
      category: category,
    }
    this.booksService.createBook(createBook).subscribe({
      next: (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Create Success!',
          text: response.message,
          timer: 3000
      }).then(() => {
        location.reload();
      })
    },
      error: (error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Attention',
          text: error.error.message,
        })
      }
    });
  }
}

}
