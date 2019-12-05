import { AuthorDataModel} from "../models";
import { AuthorRepository, AuthorModel } from "../repositories";
import { inject, injectable } from "inversify";
import { ApplicationError } from "../common";
@injectable()
export class AuthorService {
    constructor(
        @inject(AuthorRepository) private _authorRepository: AuthorRepository) { }

    async add(authorModel: AuthorDataModel): Promise<AuthorDataModel> {
        const existedAuthor = await this._authorRepository.findOneByName(
            authorModel.name,

        );
        if (existedAuthor) {
            throw new ApplicationError("Author already exist!");
        }
        const authorEntity = await this._authorRepository.add({
            id: null,
            name: authorModel.name,
        });
        return authorEntity;
    }

    async getById(id: number): Promise<AuthorDataModel> {
        const value = await this._authorRepository.findOneById(id);
        return {
            name: value.name,
        };
    }


    async getByName(name: string): Promise<AuthorDataModel> {
        const value = await this._authorRepository.findOneByName(name);
        return {
            name: value.name,
        };
    }

    async update(id: number, name: string): Promise<boolean> {
        const value = await this._authorRepository.update(id, name);
        return true;
    }

    async delete(id: number): Promise<boolean> {
        const value = await this._authorRepository.delete(id);
        return true;
    }
    

}
