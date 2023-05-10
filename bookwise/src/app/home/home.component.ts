import { Component, OnInit } from '@angular/core';
import { BooksService } from '../utils/service/book-service';
import { UserService } from '../utils/service/user.service';
import { GetAllBooksResponse } from '../utils/response/book.response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoading = true;
  directionLinks = true;
  books: GetAllBooksResponse[] = [];
  filteredBooks: { [category: string]: GetAllBooksResponse[] } = {};
  categories: string[] = [];
  currentPage: { [category: string]: number } = {};
  pageSize = 4;
  adminAccess = false;
  clientAccess = false;

  constructor(
    private booksService: BooksService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getBooks();

    setTimeout(() => {
      this.isLoading = false;
      const container = document.querySelector('.container');
      if (container) {
        container.classList.add('show');
      }
    }, 1000);

    const token = localStorage.getItem('token');
    if (token) {
      const UpdateUserRequest = { token: token };
      this.userService.profileUserService(UpdateUserRequest).subscribe((user: any) => {
        const mappingUserType: Record<number, string> = {
          1: "ADMIN",
          2: "CLIENT",
        };
        const user_type = mappingUserType[user.user['user_type_id']];
        if (user_type == 'ADMIN'){
          this.adminAccess = true;
        }
        if (user_type == 'CLIENT'){
          this.clientAccess = true;
        }
      });
    }
  }

  getBooks(): void {
    this.booksService.getAllBooksService().subscribe(
      data => {
        this.books = data.book;
        this.categories = [...new Set(this.books.map(book => book.category))];
        this.categories.forEach(category => {
          this.filteredBooks[category] = this.books.filter(book => book.category === category);
          this.currentPage[category] = 1;
        });
      },
      error => {
        console.log('Error fetching books', error);
      }
    );
  }

  onPageChange(event: number, category: string): void {
    this.currentPage[category] = event;
  }

  trackByFn(index: number, item: GetAllBooksResponse) {
    return item.id;
  }
}