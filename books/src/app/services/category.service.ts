import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryViewModel } from 'app/shared/models';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(
    private http: HttpClient,
  ) { }

  public getCategories(): Observable<CategoryViewModel[]> {
    return this.http.get<CategoryViewModel[]>(`${environment.apiUrl}/categories`)
  }
 
  public addCategory(categories: CategoryViewModel): Observable<CategoryViewModel>  {
    return this.http.post<CategoryViewModel>(`${environment.apiUrl}/categories/${categories.id}`, categories)
  }

  public updateCategory(id: string, categories: CategoryViewModel ): Observable<CategoryViewModel> {
    return this.http.put<CategoryViewModel>(`${environment.apiUrl}/categories/${id}`, categories)
  }

  public deleteCategory(id: string) {
    return this.http.delete(`${environment.apiUrl}/books/${id}`)
  }

}
