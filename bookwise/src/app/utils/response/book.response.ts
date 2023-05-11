export interface GetAllBooksResponse {
    id: string;
    title: string;
    author: string;
    year: string;
    isbn: string;
    edition: string;
    origin: string;
    book_format: string | null;
    binding: string;
    language: string;
    country: string;
    pages: string;
    stock: string;
    url_img: string;
    description: string;
    price: string;
    category: string;
}


export interface GetBookByIdResponse {
    id: string;
    title: string;
    author: string;
    year: string;
    isbn: string;
    edition: string;
    origin: string;
    book_format: string | null;
    binding: string;
    language: string;
    country: string;
    pages: string;
    stock: string;
    url_img: string;
    description: string;
    price: string;
    category: string;
}

export interface UpdateBookByIdResponse {
    id: string;
    title: string;
    author: string;
    year: string;
    isbn: string;
    edition: string;
    origin: string;
    book_format: string | null;
    binding: string;
    language: string;
    country: string;
    pages: string;
    stock: string;
    url_img: string;
    description: string;
    price: string;
    category: string;
}


export interface CreateBookResponse {
    id: string;
    title: string;
    author: string;
    year: string;
    isbn: string;
    edition: string;
    origin: string;
    book_format: string | null;
    binding: string;
    language: string;
    country: string;
    pages: string;
    stock: string;
    url_img: string;
    description: string;
    price: string;
    category: string;
}


export interface DeleteBookByIdResponse {
    id: string;
    title: string;
    author: string;
    year: string;
    isbn: string;
    edition: string;
    origin: string;
    book_format: string | null;
    binding: string;
    language: string;
    country: string;
    pages: string;
    stock: string;
    url_img: string;
    description: string;
    price: string;
    category: string;
}


export interface SearchBooksResponse {
    id: string;
    title: string;
    author: string;
    year: string;
    isbn: string;
    edition: string;
    origin: string;
    book_format: string | null;
    binding: string;
    language: string;
    country: string;
    pages: string;
    stock: string;
    url_img: string;
    description: string;
    price: string;
    category: string;
}


export interface BooksCartModel {
    id: string;
    url_img: string;
    title: string;
    quantity: number;
    price: string;
    stock: string;
}