import { Component, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from '../utils/service/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('header', { static: true })
  header!: TemplateRef<any>;

  books = [
    {title: 'Book 1', author: 'Author 1', image: 'https://via.placeholder.com/150', category: 'Category 1'},
    {title: 'Book 2', author: 'Author 2', image: 'https://via.placeholder.com/150', category: 'Category 1'},
    {title: 'Book 3', author: 'Author 3', image: 'https://via.placeholder.com/150', category: 'Category 1'},
    {title: 'Book 4', author: 'Author 4', image: 'https://via.placeholder.com/150', category: 'Category 1'},
    {title: 'Book 5', author: 'Author 5', image: 'https://via.placeholder.com/150', category: 'Category 2'},
    {title: 'Book 6', author: 'Author 6', image: 'https://via.placeholder.com/150', category: 'Category 2'},
    {title: 'Book 7', author: 'Author 7', image: 'https://via.placeholder.com/150', category: 'Category 2'},
    {title: 'Book 8', author: 'Author 8', image: 'https://via.placeholder.com/150', category: 'Category 2'}
  ];

  booksChunks: { [key: string]: any[] } = {};
  categories: string[] = [];

  defaultHeader!: TemplateRef<any>;
  
  constructor(private authService: AuthService,) {}

  ngOnInit(): void {
    this.categories = this.getCategories();
    this.booksChunks = this.chunk(this.books, 4);
  }

  getCategories(): string[] {
    return [...new Set(this.books.map(book => book.category))];
  }


  logout(): void{
    this.authService.logoutService()
  }

  chunk(arr: any[], size: number): { [key: string]: any[][] } {
    const chunks: { [key: string]: any[][] } = {};
    for (let i = 0; i < arr.length; i++) {
      const category = arr[i].category;
      if (!(category in chunks)) {
        chunks[category] = [];
      }
      chunks[category].push(arr[i]);
    }
    for (const category in chunks) {
      chunks[category] = this.chunkArray(chunks[category], size);
    }
    return chunks;
  }
  

  chunkArray(arr: any[], size: number): any[] {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  }

}
