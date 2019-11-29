
import { injectable, inject } from "inversify";
import {
    Controller,
    RequestPost,
    ResponseBase,
    RouteHandler
} from "../common";
import { BookService } from "../services";
import { BookDataModel } from "models";
import { BookModel } from "repositories";

@injectable()
export class BookController implements Controller {
    @inject(BookService) private _bookService: BookService;


    constructor() {
        this.addBook = this.addBook.bind(this);
        this.addBook = this.addBook.bind(this);
        this.getBook = this.getBook.bind(this);
        this.updateBook = this.updateBook.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
    }

    async addBook(
        request: RequestPost<BookDataModel>,
        response: ResponseBase<BookDataModel>
    ) {
        const book = await this._bookService.addBook({ ...request.body });
        return response.send(book);
    }

    async getBook(
        request: RequestPost<BookDataModel>,
        response: ResponseBase<BookDataModel>
    ) {
        const book = await this._bookService.get(
            request.body.title,
        );
        return response.send(book);
    }

    async updateBook(
        request: RequestPost<BookModel>,
        response: ResponseBase<boolean>
    ) {
        const book = await this._bookService.update(
            request.body.id,
            request.body,
        );
        return response.send(true);
    }

    async deleteBook(
        request: RequestPost<number>,
        response: ResponseBase<boolean>
    ) {
        await this._bookService.delete(
            request.body
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
            route: `/${prefix}/get-book`,
            handlers: [<any>this.getBook],
            type: "GET"
        });
        handlers.push({
            route: `/${prefix}/update-book`,
            handlers: [<any>this.updateBook],
            type: "PUT"
        });
        handlers.push({
            route: `/${prefix}/delete-book`,
            handlers: [<any>this.deleteBook],
            type: "DELETE"
        });

        return handlers;
    }
}
