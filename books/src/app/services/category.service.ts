import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book, Category } from 'app/shared/models';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(
    private http: HttpClient,
  ) { }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Book[]>(`${environment.apiUrl}/categories`)
  }
 
  public addCategory(categories: Category): Observable<Category>  {
    return this.http.post<Category>(`${environment.apiUrl}/categories/${categories.id}`, categories)
  }

  public updateCategory(id: string, categories: Category ): Observable<Category> {
    return this.http.put<Category>(`${environment.apiUrl}/categories/${id}`, categories)
  }

  public deleteCategory(id: string) {
    return this.http.delete(`${environment.apiUrl}/books/${id}`)
  }

}
