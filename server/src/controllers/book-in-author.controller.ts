
import { injectable, inject } from "inversify";
import {
    Controller,
    RequestPost,
    ResponseBase,
    RouteHandler
} from "../common";
import { BookInAuthorService } from "../services";
import { BookInAuthorDataModel } from "models";
import { BookInAuthorModel,} from "repositories";


@injectable()
export class BookInAuthorController implements Controller {
    @inject(BookInAuthorService) private _bookInAuthorService: BookInAuthorService;
   

    constructor() {
        this.addBookInAuthor = this.addBookInAuthor.bind(this);
        // this.getBookInAuthor = this.getBookInAuthor.bind(this);
        this.updateBookInAuthor = this.updateBookInAuthor.bind(this);
        this.deleteBookInAuthor = this.deleteBookInAuthor.bind(this);
    }


    async addBookInAuthor(
        request: RequestPost<BookInAuthorModel>,
        response: ResponseBase<BookInAuthorDataModel>
    ) {
        this._bookInAuthorService.getBookInAuthor({ ...request.body }).then((response) => {
            if (!response) {
                return;
            }

          response.addBookModel(response.book)
        });
        console.log({ ...request.body })

        return response.send({ ...request.body });
    }

    // async getBookInAuthor(
    //     request: RequestPost<BookInAuthorDataModel>,
    //     response: ResponseBase<BookInAuthorDataModel>
    // ) {
    //     const author = await this._bookInAuthorService.getBookInAuthor(
    //         request.body.authorId,
    //     );
    //     return response.send(author);
    // }

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
        // handlers.push({
        //     route: `/${prefix}/get-book-in-author`,
        //     handlers: [<any>this.getBookInAuthor],
        //     type: "GET"
        // });
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
