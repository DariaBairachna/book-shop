export class BookViewModel {
    id: string;
    cover?: string;
    title: string;
    description: string;
    category: string;
    authors: Array<string>;
    price: number;
    currency: string;
}