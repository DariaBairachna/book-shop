import { AuthorEntity } from "./author.entity";

export class BookEntity {
    id: number;
    cover?: string;
    title: string;
    description: string;
    category: string;
    price: number;
    currency: string;
    authors?:Array<number>;
    // authorsId?: Array<number>;
}
