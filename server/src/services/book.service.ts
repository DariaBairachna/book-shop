import { BookDataModel} from "../models";
import { BookRepository, BookModel } from "../repositories";
import { inject, injectable } from "inversify";
import { ApplicationError } from "../common";
@injectable()
export class BookService {
    constructor(
        @inject(BookRepository) private _bookRepository: BookRepository) { }

    async addBook(bookModel: BookDataModel): Promise<BookDataModel> {
        const existedBook = await this._bookRepository.findOneByTitle(
            bookModel.title,

        );
        if (existedBook) {
            throw new ApplicationError("Book already exist!");
        }
        const bookEntity = await this._bookRepository.add({
            id: null,
            cover: bookModel.cover,
            title: bookModel.title,
            description: bookModel.description,
            category: bookModel.category,
            price: bookModel.price,
            currency: bookModel.currency,
            
        });
        return bookEntity;
    }



    async get(title: string): Promise<BookDataModel> {
        const value = await this._bookRepository.findOneByTitle(title);
        return {
            cover: value.cover,
            title: value.title,
            description: value.description,
            category: value.category,
            price: value.price,
            currency: value.currency,
           
        };
    }

    async update(id: number, data: BookDataModel): Promise<boolean> {
        const value = await this._bookRepository.update(id, data);
        return true;
    }

    async delete(id: number): Promise<boolean> {
        const value = await this._bookRepository.delete(id);
        return true;
    }
    

}
