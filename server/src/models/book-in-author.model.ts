import { BookInAuthorEntity } from "entities";
import { Model } from "sequelize";

export interface BookInAuthorSequelizeScheme extends BookInAuthorEntity, Model<BookInAuthorEntity> { }

export class BookInAuthorModel extends Model implements BookInAuthorEntity {
    id: number;
    authorId: number;
    bookId: number;
}