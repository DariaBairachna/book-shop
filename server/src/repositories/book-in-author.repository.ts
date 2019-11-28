import { BookInAuthorEntity, BookEntity, AuthorEntity } from "../entities";
import { Model } from "sequelize";
import { injectable, id } from "inversify";
import { BookInAuthorDataModel } from "models";
import { BookModel } from "../repositories";
import { AuthorModel } from "./author.repository";
export interface BookInAuthorSequelizeScheme extends BookInAuthorEntity, Model<BookInAuthorEntity> { }

export class BookInAuthorModel extends Model implements BookInAuthorEntity {
    id: number;
    authorId: number;
    bookId: number;
}

@injectable()
export class BookInAuthorRepository {
    constructor() { }

    async findAll(): Promise<BookInAuthorEntity[]> {
        const booksInAuthors = await BookInAuthorModel.findAll();
        return booksInAuthors;
    }

    async findOneAuthor(authorId: number): Promise<AuthorModel> {
        const result = await AuthorModel.findOne({
            where: {
               id: authorId,
            }
        });
        return result;
    }
    async findOneBook(bookId: number): Promise<BookModel> {
        const result = await BookModel.findOne({
            where: {
                id: bookId,
            }
        });
        return result;
    }

    async update(bookId: number, data: BookInAuthorDataModel): Promise<boolean> {
        const result = await BookInAuthorModel.update({ data: data }, {
            where: { bookId: bookId },

        })

        return true

    }

    async delete(bookId: number): Promise<void> {
        const result = await BookInAuthorModel.destroy({
            where: { bookId: bookId }
        })

    }
}
