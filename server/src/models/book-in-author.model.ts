
import {  BookModel, AuthorModel, BookInAuthorSequelizeScheme, BookSequelizeScheme, AuthorSequelizeScheme } from "repositories";
import { Model } from "sequelize/types";

export interface BookInAuthorDataModel {
    authorId: number;
    bookId: number;
}

export interface BookInAuthorFullModel {
    book: BookSequelizeScheme;
    author: AuthorSequelizeScheme;
}
