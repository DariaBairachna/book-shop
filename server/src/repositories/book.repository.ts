import { UserEntity, BookEntity } from "../entities";
import { Model } from "sequelize";
import { injectable, id } from "inversify";
import { BookDataModel, BookInAuthorModel } from "../models";
import { AuthorModel } from ".";
import { type } from "os";

export interface BookSequelizeScheme extends BookEntity, Model<BookEntity> { }

export class BookModel extends Model implements BookEntity {
    id: number;
    cover?: string;
    title: string;
    description: string;
    category: string;
    price: number;
    currency: string;
    getAuthors: Function;
    addAuthor: Function;
    setAuthors: Function;
}


@injectable()
export class BookRepository {
    constructor() { }

    async add(entity: BookEntity): Promise<BookModel> {
        let newValue = await BookModel.create(entity);
        return newValue;
    }

    async findAll(): Promise<BookEntity[]> {
        const books = await BookModel.findAll(
            {
                include: [{
                    model: AuthorModel,
                    through: { attributes: [] }
                }],

            }
        );
        return books;
    }

    async findOneByTitle(title: string): Promise<BookEntity> {
        const result = await BookModel.findOne({
            where: { title: title },
            include: [{

                model: AuthorModel,
                through: { attributes: [] }

            }]
        });

        return result;
    }

    async findOneById(id: number): Promise<BookEntity> {

        const result = await BookModel.findOne({
            where: { id: id },
            include: [
                {
                    model: AuthorModel,
                    through: { attributes: [] }
                },
            ]
        });
        return result;
    }

    async update(id: number, book: BookEntity): Promise<boolean> {
        const result = await BookModel.update(book, {
            where: { id: id },
        });
        return true;
    }

    async delete(idBook: number): Promise<void> {
        const result = await BookModel.destroy({
            where: { id: idBook }
        });
        const bookInAuthor = await BookInAuthorModel.destroy({
            where: { bookId: idBook }
        })

    }
}
