import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private url: string = 'http://localhost:5000/api/v1/home/';

  constructor(private httpClient: HttpClient) {}

  public getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.url + 'listProducts');
  }

  public getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.url + 'findProduct/' + id);
  }
}
