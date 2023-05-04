import { Component } from '@angular/core';
import { BooksService } from '../utils/service/book-service';
import { ActivatedRoute } from '@angular/router';
import { capitalize } from '../utils/format/format-capitalize';
import { FormBuilder, Validators } from '@angular/forms';
import { formatLettersOnly } from '../utils/format/format-letters-only';
import { formatOnlyNumber } from '../utils/format/format-only-number';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { GetBookByIdResponse } from '../utils/response/book.response';
import { GetBookByIdRequest, UpdateBooksByIdRequest } from '../utils/request/book.request';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent {
  isEditing: boolean = false;
  id!: GetBookByIdRequest
  book: GetBookByIdResponse = {} as GetBookByIdResponse;
  isLoading = true;
  updateEnabled = false

  constructor(private fb: FormBuilder, 
              private booksService: BooksService,
              private route: ActivatedRoute,){}

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


  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
      const container = document.querySelector('.container');
      if (container) {
        container.classList.add('show');
      }
    }, 1000);
      
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const idRequest: GetBookByIdRequest = { id };
      this.booksService.getBookByIdService(idRequest).subscribe(data => {
        this.book = data.book;
        this.bookForm.patchValue({
          title: capitalize(this.book.title),
          author: capitalize(this.book.author),
          year: capitalize(this.book.year),
          isbn: capitalize(this.book.isbn),
          edition: capitalize(this.book.edition),
          origin: capitalize(this.book.origin),
          book_format: capitalize(this.book.book_format || ''),
          binding: capitalize(this.book.binding),
          language: capitalize(this.book.language),
          country: capitalize(this.book.country),
          pages: capitalize(this.book.pages),
          stock: this.book.stock,
          url_img: this.book.url_img,
          description: capitalize(this.book.description),
          price: this.book.price  ,
          category: capitalize(this.book.category),
        });
      });
    }
    this.bookForm.markAllAsTouched();
  }

  formatLettersOnly(event: any){
    formatLettersOnly(event)
  }

  formatOnlyNumber(event: any){
    formatOnlyNumber(event)
  }

  updateBook(){

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
      
      let updateBook: UpdateBooksByIdRequest  = {
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

      const id = this.route.snapshot.paramMap.get('id');
      
      if(id){
        const idRequest: GetBookByIdRequest = { id };
        this.booksService.updateBookByIdService(updateBook, idRequest).subscribe({
          next: (response: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Update Success!',
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
            }).then(() => {
              location.reload();
            })
          }
        });
      }
    }
  }
}

