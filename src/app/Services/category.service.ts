import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../common/category';
import { Observable } from 'rxjs';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url: string = 'http://localhost:5000/api/v1/admin/categories/';

  constructor(private htpp: HttpClient, private headerService: HeaderService) {}

  public getCategoryList(): Observable<Category[]> {
    return this.htpp.get<Category[]>(this.url + 'listCategories', {
      headers: this.headerService.headers,
    });
  }

  public createdCategory(category: Category): Observable<Category> {
    return this.htpp.post<Category>(this.url + 'createCategory', category, {
      headers: this.headerService.headers,
    });
  }

  public deleteCategoryByid(id: number): Observable<any> {
    return this.htpp.delete(`${this.url}deleteCategory/${id}`, {
      headers: this.headerService.headers,
    });
  }

  public categoryById(id: number): Observable<Category> {
    return this.htpp.get<Category>(`${this.url}findCategory/${id}`, {
      headers: this.headerService.headers,
    });
  }
}
