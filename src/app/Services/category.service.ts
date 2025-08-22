import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../common/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url: string = 'http://localhost:5000/api/v1/admin/categories/';

  constructor(private htpp: HttpClient) {}

  public getCategoryList(): Observable<Category[]> {
    return this.htpp.get<Category[]>(this.url + 'listCategories');
  }

  public createdCategory(category: Category): Observable<Category> {
    return this.htpp.post<Category>(this.url + 'createCategory', category);
  }

  public deleteCategoryByid(id: number): Observable<any> {
    return this.htpp.delete(`${this.url}deleteCategory/${id}`);
  }

  public categoryById(id: number): Observable<Category> {
    return this.htpp.get<Category>(`${this.url}findCategory/${id}`);
  }
}
