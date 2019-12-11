import { AuthorEntity } from "../entities";
import { Model } from "sequelize";
import { injectable, id } from "inversify";
import { BookModel } from "../repositories";
import { AuthorDataModel } from "models";

export interface AuthorSequelizeScheme extends AuthorEntity, Model<AuthorEntity> { }

export class AuthorModel extends Model implements AuthorEntity{
    id: number;
    name: string;
    addBook: Function;
    getBooks: Function;
}

@injectable()
export class AuthorRepository {
    constructor() { }

    async add(entity: AuthorEntity): Promise<AuthorEntity> {
        let newValue = await AuthorModel.create(entity);
        return newValue;
    }

    async findAll(): Promise<AuthorDataModel[]> {
        const authors = await AuthorModel.findAll(
            {
                include: [{
                    attributes: ['title'],
                    model: BookModel,
                    through: {attributes: []}
                }]
            }
        );
        return authors;
    }

    async findById(id: Array<number>): Promise<AuthorEntity[]> {
        const result = await AuthorModel.findAll({
            where: { id: id }
        });
        return result;
    }

    async findOneByName(name: string): Promise<AuthorEntity> {
        const result = await AuthorModel.findOne({
            where: { name: name }
        });
        return result;
    }


    async findOneById(id: number): Promise<AuthorEntity> {
        const result = await AuthorModel.findOne({
            where: { id: id }
        });
        return result;
    }

    async update(authorId: number, name: string): Promise<boolean> {
        const result = await AuthorModel.update({ name: name }, {
            where: { id: authorId },
        })
        return true
    }

    async delete(authorId: number): Promise<void> {
        const result = await AuthorModel.destroy({
            where: { id: authorId }
        })
    }
}
