import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../common/product';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root',
})
export class ProductServicesService {
  private url: string = 'http://localhost:5000/api/v1/admin/products/';

  constructor(
    private httpClient: HttpClient,
    private headerService: HeaderService
  ) {}

  public getProducts(): Observable<Product[]> {
    if (!this.headerService['token']) {
      console.warn('No hay token, no se hace la petición');
    }

    return this.httpClient
      .get<Product[]>(this.url + 'listProducts', {
        headers: this.headerService.headers,
      })
      .pipe(
        catchError((err) => {
          if (err.status === 403) {
            console.error('Acceso prohibido - Token inválido o expirado');
          }
          return throwError(() => new Error('Error al obtener productos'));
        })
      );
  }

  public createProduct(formData: any): Observable<any> {
    return this.httpClient.post<Product>(this.url + 'saveProduct', formData, {
      headers: this.headerService.headers,
    });
  }

  public deleteProductById(id: number): Observable<any> {
    return this.httpClient.delete(this.url + 'deleteProduct/' + id, {
      headers: this.headerService.headers,
    });
  }

  public getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.url + 'findProduct/' + id, {
      headers: this.headerService.headers,
    });
  }
}
