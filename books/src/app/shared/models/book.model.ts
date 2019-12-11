import { AuthorViewModel } from './author.model';

export class BookViewModel {
    id: number;
    cover?: string;
    title: string;
    description: string;
    category: string;
    authorsId: Array<number>;
    authors?: Array<AuthorViewModel>;
    price: number;
    currency: string;
}

export interface BookResponseViewModel {
    book: BookViewModel,
    authors:  Array<AuthorViewModel>,
}