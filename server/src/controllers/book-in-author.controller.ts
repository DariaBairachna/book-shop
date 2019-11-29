
import { injectable, inject } from "inversify";
import {
    Controller,
    RequestPost,
    ResponseBase,
    RouteHandler,
    RequestGet
} from "../common";
import { BookInAuthorService } from "../services";
import { BookInAuthorDataModel } from "models";
import { BookInAuthorModel, AuthorModel, BookModel } from "../repositories";


@injectable()
export class BookInAuthorController implements Controller {
    @inject(BookInAuthorService) private _bookInAuthorService: BookInAuthorService;


    constructor() {
        this.addBookInAuthor = this.addBookInAuthor.bind(this);
        this.getAuthorInBook = this.getAuthorInBook.bind(this);
        this.getBookInAuthor = this.getBookInAuthor.bind(this);
        this.updateBookInAuthor = this.updateBookInAuthor.bind(this);
        this.deleteBookInAuthor = this.deleteBookInAuthor.bind(this);
    }


    async addBookInAuthor(
        request: RequestPost<BookInAuthorModel>,
        response: ResponseBase<BookInAuthorDataModel>
    ) {
        this._bookInAuthorService.add(request.body.bookId, request.body.authorId);
               
        return response.send(request.body);
    }
    async getBookInAuthor(
        request: RequestGet<{ id: number }>,
        response: ResponseBase<string>
    ) {
        this._bookInAuthorService.getAuthor(
            request.query.id,
        ).then((author) => {
            author.getBooks().then((books) => {
                return books;
            })
        });

        return response.send("Success");
    }

    async getAuthorInBook(
        request: RequestGet<{ id: number }>,
        response: ResponseBase<string>
    ) {
        this._bookInAuthorService.getBook(
            request.query.id
        ).then((book) => {
            book.getAuthors().then((authors) => {
                return authors;
            })
        });

        return response.send("Success");
    }

    async updateBookInAuthor(
        request: RequestPost<BookInAuthorModel>,
        response: ResponseBase<boolean>
    ) {
        const book = await this._bookInAuthorService.updateBookInAuthor(
            request.body.id,
            request.body,
        );
        return response.send(true);
    }

    async deleteBookInAuthor(
        request: RequestPost<number>,
        response: ResponseBase<boolean>
    ) {
        await this._bookInAuthorService.deleteBookInAuthor(
            request.body
        );
        return response.send(true);
    }

    routes(): RouteHandler[] {
        const handlers: RouteHandler[] = [];
        const prefix = "book-in-author";

        handlers.push({
            route: `/${prefix}/add-book-in-author`,
            handlers: [<any>this.addBookInAuthor],
            type: "POST"
        });
        handlers.push({
            route: `/${prefix}/get-book-in-author`,
            handlers: [<any>this.getBookInAuthor],
            type: "GET"
        });
        handlers.push({
            route: `/${prefix}/get-author-in-book`,
            handlers: [<any>this.getAuthorInBook],
            type: "GET"
        });
        handlers.push({
            route: `/${prefix}/update-book-in-author`,
            handlers: [<any>this.updateBookInAuthor],
            type: "PUT"
        });
        handlers.push({
            route: `/${prefix}/delete-book-in-author`,
            handlers: [<any>this.deleteBookInAuthor],
            type: "DELETE"
        });

        return handlers;
    }
}
