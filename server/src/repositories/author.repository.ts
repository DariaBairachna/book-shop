import { AuthorEntity } from "../entities";
import { Model } from "sequelize";
import { injectable, id } from "inversify";

export interface AuthorSequelizeScheme extends AuthorEntity, Model<AuthorEntity> { }

export class AuthorModel extends Model implements AuthorEntity {
    id: number;
    name: string;
}

@injectable()
export class AuthorRepository {
    constructor() { }

    async add(entity: AuthorEntity): Promise<AuthorEntity> {
        let newValue = await AuthorModel.create(entity);
        return newValue;
    }

    async findAll(): Promise<AuthorEntity[]> {
        const authors = await AuthorModel.findAll();
        return authors;
    }

    async findOne(name: string): Promise<AuthorEntity> {
        const result = await AuthorModel.findOne({
            where: { name: name }
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
