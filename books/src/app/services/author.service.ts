import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Author } from 'app/shared/models';


@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  
  constructor(
    private http: HttpClient) { }

  public getAuthor(): Observable<Author[]> {
    return this.http.get<Author[]>(`${environment.apiUrl}/autors`)
  }

  public addAuthor(autor: Author): Observable<Author>  {
    return this.http.post<Author>(`${environment.apiUrl}/autors/${autor.id}`, autor)
  }

  public updateAuthor(id: string, autor: Author ): Observable<Author> {
    return this.http.put<Author>(`${environment.apiUrl}/autors/${id}`, autor)
  }

  public deleteAuthor(id: string) {
    return this.http.delete(`${environment.apiUrl}/autors/${id}`)
  }

}
