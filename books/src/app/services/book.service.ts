import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookViewModel } from 'app/shared/models';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { BooksManagementModule } from 'app/books-management/books-management.module';


@Injectable()
export class BookService {
  
  constructor(
    private http: HttpClient,
    ) { }

  public getBooks(): Observable<BookViewModel[]> {
    return this.http.get<BookViewModel[]>(`${environment.apiUrl}/book/get-books`)
  }
  public getBook(id: string): Observable<BookViewModel> {
    return this.http.get<BookViewModel>(`${environment.apiUrl}/books/${id}`)
  }
  public addBook(book: BookViewModel): Observable<BookViewModel>  {
    return this.http.post<BookViewModel>(`${environment.apiUrl}/books/${book.id}`, book)
  }

  public updateBook(id: string, data: BookViewModel ): Observable<BookViewModel> {
    return this.http.put<BookViewModel>(`${environment.apiUrl}/books/${id}`, data)
  }

  public deleteBook(id: string) {
    return this.http.delete(`${environment.apiUrl}/books/${id}`)
  }

}
