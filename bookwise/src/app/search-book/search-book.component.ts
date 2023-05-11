import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../utils/service/book-service';
import { SearchBooksResponse } from '../utils/response/book.response';
import { SearchBooksRequest } from '../utils/request/book.request';
import { UserService } from '../utils/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-searc-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css']
})
export class SearchBookComponent {
  books: SearchBooksResponse[] = [];
  filteredBooks: { [category: string]: SearchBooksResponse[] } = {};
  categories: string[] = [];
  currentPage: { [category: string]: number } = {};
  pageSize = 4;
  adminAccess = false;
  clientAccess = false;
  isLoading = true;

  constructor(private route: ActivatedRoute,
              private router: Router, 
              private booksService: BooksService,
              private userService: UserService) { }

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
      const container = document.querySelector('.container');
      if (container) {
        container.classList.add('show');
      }
  
      this.route.queryParams.subscribe(params => {
        const request: SearchBooksRequest = {
          option: params['option'],
          term: params['term']
        };
      
        this.booksService.searchBooks(request).subscribe(
          data => {
            this.books = data.book;
            this.categories = [...new Set(this.books.map(book => book.category))];
            this.categories.forEach(category => {
              this.filteredBooks[category] = this.books.filter(book => book.category === category);
              this.currentPage[category] = 1;
            });
          },
          error => {
            Swal.fire({
              icon: 'error',
              title: 'Attention',
              text: error.error.message,
            }).then(() => {
              this.router.navigate(['/home'])
            })
          }
        );
      });
  
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
    }, 1000);
  }

  onPageChange(event: number, category: string): void {
    this.currentPage[category] = event;
  }

  trackByFn(index: number, item: SearchBooksResponse) {
    return item.id;
  }

}
