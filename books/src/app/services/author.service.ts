import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { AuthorViewModel } from 'app/shared/models';

@Injectable()
export class AuthorService {

  constructor(
    private http: HttpClient) { }

  public getAuthors(): Observable<AuthorViewModel[]> {
    return this.http.get<AuthorViewModel[]>(`${environment.apiUrl}/autors`)
  }

  public addAuthor(autor: AuthorViewModel): Observable<AuthorViewModel> {
    return this.http.post<AuthorViewModel>(`${environment.apiUrl}/autors/${autor.id}`, autor)
  }

  public updateAuthor(id: string, autor: AuthorViewModel): Observable<AuthorViewModel> {
    return this.http.put<AuthorViewModel>(`${environment.apiUrl}/autors/${id}`, autor)
  }

  public deleteAuthor(id: string) {
    return this.http.delete(`${environment.apiUrl}/autors/${id}`)
  }
}
