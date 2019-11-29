import { UserEntity, BookEntity } from "../entities";
import { Model } from "sequelize";
import { injectable, id } from "inversify";
import { BookDataModel } from "models";

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
}

@injectable()
export class BookRepository {
    constructor() { }

    async add(entity: BookEntity): Promise<BookEntity> {
        let newValue = await BookModel.create(entity);
        console.log(entity)
        return newValue;
    }

    async findAll(): Promise<BookEntity[]>{
        const books = await BookModel.findAll();
        return books;
    }

    async findOneByTitle(title: string): Promise<BookEntity> {
          const result = await BookModel.findOne({
            where: { title: title }
        });
        return result;
    }

    async findOneById(id: number): Promise<BookEntity> {
        const result = await BookModel.findOne({
          where: { id: id }
      });
      return result;
  }

    async update(idBook: number, data: BookDataModel): Promise<boolean> {
        const result = await BookModel.update({ data: data }, {
            where: { id: idBook },

        })

       return true

    }

    async delete(idBook: number): Promise<void> {
        const result = await BookModel.destroy({
            where: { id: idBook }
        })

    }
}
