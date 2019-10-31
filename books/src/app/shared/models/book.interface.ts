export interface Book {
    id: string;
    cover?: string;
    title: string;
    description: string;
    category: string;
    author: Array<string>;
    price: number;
    currency: string;
}