
import {  BookModel, AuthorModel } from "repositories";
import { Model } from "sequelize/types";
import { BookEntity } from "entities";

export interface BookInAuthorDataModel {
     authorId: number;
    bookId: number;
}

export interface BookInAuthorFullModel {
    book: BookModel;
    author: AuthorModel;
}
