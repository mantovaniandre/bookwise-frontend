export interface UpdateBooksByIdRequest {
    title: string;
    author: string;
    year: string;
    isbn: string;
    edition: string;
    origin: string;
    book_format: string;
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


export interface CreateBookRequest {
    title: string;
    author: string;
    year: string;
    isbn: string;
    edition: string;
    origin: string;
    book_format: string;
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

export interface CreateBookRequest {
    title: string;
    author: string;
    year: string;
    isbn: string;
    edition: string;
    origin: string;
    book_format: string;
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


export interface DeleteBookByIdRequest {
    id:string;
}

export interface GetBookByIdRequest {
    id:string;
}

export interface SearchBooksRequest {
    option: string,
    term: string
}
