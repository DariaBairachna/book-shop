import { BookInAuthorDataModel, BookInAuthorFullModel } from "../models";
import { BookInAuthorRepository } from "../repositories";
import { inject, injectable } from "inversify";
@injectable()
export class BookInAuthorService {
    constructor(
        @inject(BookInAuthorRepository) private _bookInAuthorRepository: BookInAuthorRepository) { }

    // async addBookInAuthor(bookInAuthorModel: BookInAuthorDataModel): Promise<void> {

    //   .then(
    //         (book) => {
    //             if (!book) {
    //                 return;
    //             };

    //             this._bookInAuthorRepository.findOneBook(bookInAuthorModel.authorId).then(
    //                 (author) => {
    //                     if (!author) {
    //                         return;
    //                     };

    //                     return author.addBookModel(book)
    //                 }
    //             )


    //         },
    //     );
    //     return bookInAuthorEntity;
    // }

    async getBookInAuthor(bookInAuthorModel: BookInAuthorDataModel): Promise<BookInAuthorFullModel> {

        const book = await this._bookInAuthorRepository.findOneBook(bookInAuthorModel.bookId);
        const author = await this._bookInAuthorRepository.findOneAuthor(bookInAuthorModel.authorId);


        return {
            book: book,
            author: author,
        };
    }


    // async getBookInAuthor(id: number): Promise<BookInAuthorDataModel> {
    //     const value = await this._bookInAuthorRepository.findOne(id);
    //     return {
    //         bookId: value.bookId,
    //         authorId: value.authorId,
    //     };
    // }

    async updateBookInAuthor(id: number, data: BookInAuthorDataModel): Promise<boolean> {
        const value = await this._bookInAuthorRepository.update(id, data);
        return true;
    }

    async deleteBookInAuthor(id: number): Promise<boolean> {
        const value = await this._bookInAuthorRepository.delete(id);
        return true;
    }


}
