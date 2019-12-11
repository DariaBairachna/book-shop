import { BookDataModel, BookInAuthorModel } from "../models";
import { BookRepository, BookModel, AuthorRepository } from "../repositories";
import { inject, injectable } from "inversify";
import { ApplicationError } from "../common";
import { BookEntity, AuthorEntity } from "entities";
@injectable()
export class BookService {
    constructor(
        @inject(BookRepository) private _bookRepository: BookRepository,
        @inject(AuthorRepository) private _authorRepository: AuthorRepository) { }

    async addBook(bookModel: BookDataModel): Promise<BookModel> {

        const existedBook = await this._bookRepository.findOneByTitle(
            bookModel.title,

        );
        if (existedBook) {
            throw new ApplicationError("Book already exist!");
        }
        const bookEntity = this._bookRepository.add({
            id: null,
            cover: bookModel.cover,
            title: bookModel.title,
            description: bookModel.description,
            category: bookModel.category,
            price: bookModel.price,
            currency: bookModel.currency,

        })
        return bookEntity;
    }

    async addAuthorInBook(authorsId: Array<number>, book: BookModel): Promise<AuthorEntity[]> {
        const author = await this._authorRepository.findById(authorsId);
        if (!author || !book) {
            return
        };

        await book.addAuthor(author, { through: BookInAuthorModel });
        return author;
    }


    async getBooks(): Promise<BookEntity[]> {
        const books = await this._bookRepository.findAll();
        return books
    }

    async getBookById(id: number): Promise<BookEntity> {
        const value = await this._bookRepository.findOneById(id);
        return value;
    }

    async getBookByTitle(title: string): Promise<BookEntity> {
        const value = await this._bookRepository.findOneByTitle(title);

        return value;

    }

    async update(id: number, book: BookEntity): Promise<boolean> {
        const value = await this._bookRepository.update(id, book)
        return true;
    }

    async updateAuthor(bookId: number, authorsId: Array<number>): Promise<AuthorEntity[]> {
        const authors = await this._authorRepository.findById(authorsId).then((author) => {
            if (!author) {
                return
            };
            this.getBookById(bookId).then((book: BookModel)=>{
                book.setAuthors(authors, { through: BookInAuthorModel });
            })
            return author;
        });
        return authors;
    }

    async delete(id: number): Promise<boolean> {
        const value = await this._bookRepository.delete(id);
        return true;
    }


}
