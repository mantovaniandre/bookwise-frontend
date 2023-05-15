import { Component } from '@angular/core';
import { BooksService } from '../utils/service/book-service';
import { ActivatedRoute, Router } from '@angular/router';
import { capitalize } from '../utils/format/format-capitalize';
import { BooksCartModel, GetBookByIdResponse } from '../utils/response/book.response';
import { GetBookByIdRequest } from '../utils/request/book.request';
import { CartService } from '../utils/service/cart-service';

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
  rating = 0;


  constructor(private booksService: BooksService,
              private route: ActivatedRoute,
              private cartService: CartService,
              private router: Router){}

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

  addToCart() {
    const bookToAdd: BooksCartModel = {
      id: this.book.id,
      url_img: this.book.url_img,
      title: this.book.title,
      quantity: 1,
      price: this.book.price,
      stock: this.book.stock
    };
    this.cartService.addToCart(bookToAdd);
    this.router.navigate(['/cart']); // Navega para a rota do carrinho
  }

  setRating(star: number) {
    this.rating = star;
    console.log(this.rating); // Aqui você pode fazer o que quiser com a classificação
  }
 
}
