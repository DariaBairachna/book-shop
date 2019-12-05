import { UserEntity, BookEntity } from "../entities";
import { Model } from "sequelize";
import { injectable, id } from "inversify";
import { BookDataModel } from "models";
import { AuthorModel } from ".";

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

    async add(entity: BookEntity): Promise<BookEntity> {
        let newValue = await BookModel.create(entity);
        return newValue;
    }

    async findAll(): Promise<BookEntity[]> {
        const books = await BookModel.findAll(
            {
                include: [{
                    attributes: ['name'],
                    model: AuthorModel,
                }],
            }
        );
        return books;
    }

    async findOneByTitle(title: string): Promise<BookEntity> {
        const result = await BookModel.findOne({
            where: { title: title },
            include: [{
                attributes: ['name'],
                model: AuthorModel,
            }]
        });

        return result;
    }

    async findOneById(id: number): Promise<BookEntity> {

        const result = await BookModel.findOne({
            where: { id: id },
            include: [
                {
                    attributes: ['name'],
                    model: AuthorModel,

                },
            ]
        });

        return result;
    }

    async update(bookId: number, book: BookDataModel): Promise<BookDataModel> {
        const result = await BookModel.update(book, {
            where: { id: bookId },
        })
        return book
    }

    async delete(idBook: number): Promise<void> {
        const result = await BookModel.destroy({
            where: { id: idBook }
        })

    }
}
