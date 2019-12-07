import { AuthorViewModel } from './author.model';

export class BookViewModel {
    id: number;
    cover?: string;
    title: string;
    description: string;
    category: string;
    authors: Array<number>;
    price: number;
    currency: string;
}