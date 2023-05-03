import { Component } from '@angular/core';
import { BooksService } from '../utils/service/book-service';
import { ActivatedRoute } from '@angular/router';
import { GetBookByIdResponse } from '../utils/response/get-books-by-id.response';
import { GetBookByIdRequest } from '../utils/request/get-books-by-id.request';
import { capitalize } from '../utils/format/format-capitalize';

@Component({
  selector: 'app-learn-more',
  templateUrl: './learn-more.component.html',
  styleUrls: ['./learn-more.component.css']
})
export class LearnMoreComponent {
  isEditing: boolean = false;
  id!: GetBookByIdRequest
  book: GetBookByIdResponse = {} as GetBookByIdResponse;
  bookFormated = {}
  isLoading = true;


  constructor(private booksService: BooksService,
              private route: ActivatedRoute,){}

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
        this.book.title = capitalize(this.book.title);
        this.book.author = capitalize(this.book.author);
        this.book.year = capitalize(this.book.year);
        this.book.isbn = capitalize(this.book.isbn);
        this.book.edition = capitalize(this.book.edition);
        this.book.origin = capitalize(this.book.origin);
        this.book.book_format = capitalize(this.book.book_format || '') ;
        this.book.binding = capitalize(this.book.binding);
        this.book.language = capitalize(this.book.language);
        this.book.country = capitalize(this.book.country);
        this.book.pages = capitalize(this.book.pages);
        this.book.description = capitalize(this.book.description);
        this.book.category = capitalize(this.book.category);
      });
    }
  }
 
}
