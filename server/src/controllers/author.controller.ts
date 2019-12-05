
import { injectable, inject } from "inversify";
import {
    Controller,
    RequestPost,
    ResponseBase,
    RouteHandler,
    RequestDelete,
    RequestPut,
    RequestGet
} from "../common";
import { AuthorService } from "../services";
import { AuthorDataModel } from "models";
import { AuthorModel } from "repositories";

@injectable()
export class AuthorController implements Controller {
    @inject(AuthorService) private _authorService: AuthorService;


    constructor() {
        this.addAuthor = this.addAuthor.bind(this);
        this.getAuthorById = this.getAuthorById.bind(this);
        this.getAuthorByName = this.getAuthorByName.bind(this)
        this.updateAuthor = this.updateAuthor.bind(this);
        this.deleteAuthor = this.deleteAuthor.bind(this);
    }

    async addAuthor(
        request: RequestPost<AuthorDataModel>,
        response: ResponseBase<AuthorDataModel>
    ) {
        const author = await this._authorService.add({ ...request.body });
        return response.send(author);
    }

    async getAuthorByName(
        request: RequestGet<{name: string}>,
        response: ResponseBase<AuthorDataModel>
    ) {
        const author = await this._authorService.getByName(
            request.query.name,
        );
        return response.send(author);
    }

    async getAuthorById(
        request: RequestGet<{id: number}>,
        response: ResponseBase<AuthorDataModel>
    ) {
        const author = await this._authorService.getById(
            request.query.id,
        );
        return response.send(author);
    }

    async updateAuthor(
        request: RequestPut<AuthorModel>,
        response: ResponseBase<boolean>
    ) {
        const author = await this._authorService.update(
            request.params.id,
            request.body.name,
        );
        return response.send(true);
    }

    async deleteAuthor(
        request: RequestDelete<{id: number}>,
        response: ResponseBase<boolean>
    ) {
        await this._authorService.delete(
            request.path.id
        );
        return response.send(true);
    }

    routes(): RouteHandler[] {
        const handlers: RouteHandler[] = [];
        const prefix = "author";

        handlers.push({
            route: `/${prefix}/add-author`,
            handlers: [<any>this.addAuthor],
            type: "POST"
        });
        handlers.push({
            route: `/${prefix}/get-author`,
            handlers: [<any>this.getAuthorById],
            type: "GET"
        });
        handlers.push({
            route: `/${prefix}/update-author`,
            handlers: [<any>this.updateAuthor],
            type: "PUT"
        });
        handlers.push({
            route: `/${prefix}/delete-author`,
            handlers: [<any>this.deleteAuthor],
            type: "DELETE"
        });

        return handlers;
    }
}
