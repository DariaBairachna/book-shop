export interface Book {
    id: string;
    name: string;
    description: string;
    category: string;
    author: Array<string>;
    price: number;
    currency: string;
}