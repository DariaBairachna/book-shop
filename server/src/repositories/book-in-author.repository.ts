import { BookInAuthorEntity } from "../entities";
import { Model } from "sequelize";
import { injectable, id } from "inversify";
import { BookInAuthorDataModel, BookInAuthorFullModel } from "models";
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
        console.log(authorId)
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

    async findOne(id: number, bookId: boolean): Promise<BookInAuthorFullModel> {
        let result: BookInAuthorFullModel;
        if (bookId) {
           BookModel.findOne({
                where: {
                    id: id,
                }
            }).then((book)=>{
                book.getAuthors().then((authors)=>{
                    result.author = authors;
                })
            });
        };
        if (!bookId) {
            AuthorModel.findOne({
                where: {
                    authorId: id,
                }
            }).then((author)=>{
                author.getBooks().then((books)=>{
                    result.book = books
                })
            });
        }
        return result ;
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
