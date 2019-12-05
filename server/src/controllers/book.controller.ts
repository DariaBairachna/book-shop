
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
import { BookModel } from "repositories";
import { BookEntity } from "entities";


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
        response: ResponseBase<BookEntity>
    ) {
        
        const book = await this._bookService.addBook({ ...request.body });
    
        const author = await this._bookService.addAuthorInBook(book.id, request.body.authorId);
        
        return response.send(book);
    }

    async getBooks(
        request: RequestGet<null>,
        response: ResponseBase<any>
    ) {
        const books = await this._bookService.getBooks();
        return response.send(books);
    }

    async getBookByTitle(
        request: RequestGet<{ title: string }>,
        response: ResponseBase<BookEntity>
    ) {

        const book = await this._bookService.getBookByTitle(
            request.query.title,
        );

        return response.send(book);
    }

    async getBookById(
        request: RequestGet<{ id: number }>,
        response: ResponseBase<BookEntity>
    ) {
        const book = await this._bookService.getBookById(
            request.query.id,
        );
        return response.send(book);
    }

    async updateBook(
        request: RequestPut<{ id: number, book: BookDataModel }>,
        response: ResponseBase<boolean>
    ) {

        const book = await this._bookService.update(
            request.params.id,
            request.body.book
        );

        const updateAuthor = await this._bookService.updateAuthor(request.params.id, request.body.book.authorId);
        
        return response.send(true);
    }

    async deleteBook(
        request: RequestDelete<{ id: number }>,
        response: ResponseBase<any>
    ) {

        await this._bookService.delete(
            request.query.id
        );
        return response.send(response);
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
