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
    return this.http.get<AuthorViewModel[]>(`${environment.apiUrl}/author/get-authors`)
  }

  public addAuthor(autor: AuthorViewModel): Observable<AuthorViewModel> {
    return this.http.post<AuthorViewModel>(`${environment.apiUrl}/author/add-author`, autor)
  }

  public updateAuthor(id: number, autor: AuthorViewModel): Observable<AuthorViewModel> {
    return this.http.put<AuthorViewModel>(`${environment.apiUrl}/author/update-author/${id}`, autor)
  }

  public deleteAuthor(id: number) {
    return this.http.delete(`${environment.apiUrl}/author/delete-author/${id}`)
  }
}
