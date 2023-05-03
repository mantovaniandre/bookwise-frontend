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
    stock: number;
    url_img: string;
    description: string;
    price: number;
    category: string;
}