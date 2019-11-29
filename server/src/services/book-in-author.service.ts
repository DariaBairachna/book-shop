import { BookInAuthorDataModel, BookInAuthorFullModel } from "../models";
import { BookInAuthorRepository, BookModel, AuthorModel, BookInAuthorModel } from "../repositories";
import { inject, injectable } from "inversify";
@injectable()
export class BookInAuthorService {
    constructor(
        @inject(BookInAuthorRepository) private _bookInAuthorRepository: BookInAuthorRepository) { }


    async add(bookId: number, authorId: number): Promise<void> {
        const bookInAuthor = this.getBook(bookId).then((book: BookModel) => {
            if (!book) {
                return;
            };
            this.getAuthor(authorId).then((author: AuthorModel) => {
                if (!author) {
                    return;
                };
                return author.addBook(book, { through: BookInAuthorModel })
            })
        })
        return bookInAuthor;
    }

    async getBook(bookId: number): Promise<BookModel> {
        const book = this._bookInAuthorRepository.findOneBook(bookId);
        return book;
    }

    async getAuthor(authorId: number): Promise<AuthorModel> {
        const author = this._bookInAuthorRepository.findOneAuthor(authorId);
        return author;
    }


    // async get(id: number, bookId: boolean): Promise<BookInAuthorFullModel> {
    //     console.log("value")
    //     const value = await this._bookInAuthorRepository.findOne(id, bookId );

    //     return value;
    // }

    async updateBookInAuthor(id: number, data: BookInAuthorDataModel): Promise<boolean> {
        const value = await this._bookInAuthorRepository.update(id, data);
        return true;
    }

    async deleteBookInAuthor(id: number): Promise<boolean> {
        const value = await this._bookInAuthorRepository.delete(id);
        return true;
    }


}
