
import { injectable, inject } from "inversify";
import {
    Controller,
    RequestPost,
    ResponseBase,
    RouteHandler,
    RequestPut,
    RequestGet,
    RequestDelete
} from "../common";
import { BookService } from "../services";
import { BookDataModel } from "models";
import { BookEntity, AuthorEntity } from "entities";


@injectable()
export class BookController implements Controller {
    @inject(BookService) private _bookService: BookService;


    public express = require('express');
    public router = this.express.Router();
    public app = this.express();

    constructor() {
        this.addBook = this.addBook.bind(this);
        this.getBooks = this.getBooks.bind(this);
        this.getBookByTitle = this.getBookByTitle.bind(this);
        this.getBookById = this.getBookById.bind(this);
        this.updateBook = this.updateBook.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
    }

    async addBook(
        request: RequestPost<BookDataModel>,
        response: ResponseBase<object>
    ) {
        const book = await this._bookService.addBook({ ...request.body });
        const author = await this._bookService.addAuthorInBook(request.body.authors, book);
        return response.send({ book: book, authors: author });
    }

    async getBooks(
        request: RequestGet<null>,
        response: ResponseBase<any>
    ) {
        const books = await this._bookService.getBooks();
        return response.send(books);
    }

    async getBookByTitle(
        request: RequestGet<string>,
        response: ResponseBase<BookEntity>
    ) {

        const book = await this._bookService.getBookByTitle(
            request.query,
        );

        return response.send(book);
    }

    async getBookById(
        request: RequestGet<number>,
        response: ResponseBase<BookEntity>
    ) {
        const book = await this._bookService.getBookById(
            request.query,
        );
        return response.send(book);
    }

    async updateBook(
        request: RequestPut<BookEntity>,
        response: ResponseBase<AuthorEntity[]>
    ) {
        const newBook = await this._bookService.update(
            request.params.id,
            request.body
        );
        const updatedAuthor = await this._bookService.updateAuthor(request.body.id, request.body.authors);
        return response.send(updatedAuthor);
    }

    async deleteBook(
        request: RequestDelete<{ id: number }>,
        response: ResponseBase<boolean>
    ) {

        await this._bookService.delete(
            request.params.id
        );
        return response.send(true);
    }

    routes(): RouteHandler[] {
        const handlers: RouteHandler[] = [];
        const prefix = "book";
        handlers.push({
            route: `/${prefix}/add-book`,
            handlers: [<any>this.addBook],
            type: "POST"
        });

        handlers.push({
            route: `/${prefix}/update-book/:id`,
            handlers: [<any>this.updateBook],
            type: "PUT"
        });


        handlers.push({
            route: `/${prefix}/get-books`,
            handlers: [<any>this.getBooks],
            type: "GET"
        });

        handlers.push({
            route: `/${prefix}/get-book-by-id`,
            handlers: [<any>this.getBookById],
            type: "GET"
        });

        handlers.push({
            route: `/${prefix}/get-book-by-title`,
            handlers: [<any>this.getBookByTitle],
            type: "GET"
        });

        handlers.push({
            route: `/${prefix}/delete-book/:id`,
            handlers: [<any>this.deleteBook],
            type: "DELETE"
        });

        return handlers;
    }
}
