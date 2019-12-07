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

    async addBook(bookModel: BookDataModel): Promise<BookEntity> {

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
    public authorEntity: string[] = [];
    async addAuthorInBook(bookId: number, authorsId: Array<number>): Promise<Array<string>> {
        authorsId.map((authorId) => {
            return this._authorRepository.findOneById(authorId).then((author: AuthorEntity) => {
                if (!author) {
                    return;
                };

                this.getBookById(bookId).then(async (book: BookModel) => {
                    if (!book) {
                        return;
                    };
                    return book.addAuthor(author, { through: BookInAuthorModel });
                });
                let authorffff: string[] = []
                authorffff.push(author.name);
                return authorffff
            })

        });
        console.log(this.authorEntity)
        return this.authorEntity

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

    async update(id: number, book: BookDataModel): Promise<BookDataModel> {
        const value = await this._bookRepository.update(id, book)

        return value;
    }

    async updateAuthor(id: number, authorsId: Array<number>): Promise<boolean> {
        let authors: Array<any> = [];
        authorsId.map((authorId) => {
            let test = this._authorRepository.findOneById(authorId).then((author: AuthorEntity) => {
                if (!author) {
                    return;
                };
                authors.push(author);
                return author

            });
        });
        this.getBookById(id).then((book: BookModel) => {
            if (!book) {
                return;
            };
            book.setAuthors(authors, { through: BookInAuthorModel });
            return book
        });
        return true;

    }

    async delete(id: number): Promise<boolean> {
        const value = await this._bookRepository.delete(id);
        return true;
    }


}
