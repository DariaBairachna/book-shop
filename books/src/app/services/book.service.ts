import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginData, User, Book } from '../shared/models';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { LocalSlorageService } from '.';


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  
  constructor(
    private http: HttpClient,
    private localSlorageService: LocalSlorageService) { }

  public getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.apiUrl}/books`)
  }
  public getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${environment.apiUrl}/books/${id}`)
  }
  public addBook(book: Book): Observable<Book>  {
    return this.http.post<Book>(`${environment.apiUrl}/books/${book.id}`, book)
  }

  public updateBook(id: string, data: Book ): Observable<Book> {
    return this.http.put<Book>(`${environment.apiUrl}/books/${id}`, data)
  }

  public delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/books/${id}`)
  }

}
