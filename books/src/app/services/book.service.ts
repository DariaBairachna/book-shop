import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookViewModel, BookResponseViewModel } from 'app/shared/models';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';


@Injectable()
export class BookService {
  
  constructor(
    private http: HttpClient,
    ) { }

  public getBooks(): Observable<BookViewModel[]> {
    return this.http.get<BookViewModel[]>(`${environment.apiUrl}/book/get-books`)
  }
  public getBook(id: number): Observable<BookViewModel> {
    return this.http.get<BookViewModel>(`${environment.apiUrl}/book/get-book-by-id?${id}`)
  }
  public addBook(book: BookViewModel): Observable<BookResponseViewModel>  {
    return this.http.post<BookResponseViewModel>(`${environment.apiUrl}/book/add-book`, book)
  }

  public updateBook(book: BookViewModel): Observable<BookViewModel> {
    console.log(book)
    return this.http.put<BookViewModel>(`${environment.apiUrl}/book/update-book/${book.id}`, book)
  }

  public deleteBook(id: number) {
    return this.http.delete(`${environment.apiUrl}/book/delete-book/${id}`)
  }

}
