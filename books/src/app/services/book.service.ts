import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookViewModel } from 'app/shared/models';
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
  public addBook(book: BookViewModel): Observable<BookViewModel>  {
    return this.http.post<BookViewModel>(`${environment.apiUrl}/book/add-book`, book)
  }

  public updateBook(id: number, book: BookViewModel ): Observable<BookViewModel> {
    return this.http.put<BookViewModel>(`${environment.apiUrl}/book/update-book/${id}`, book)
  }

  public deleteBook(id: number) {
    return this.http.delete(`${environment.apiUrl}/book/delete-book/${id}`)
  }

}
