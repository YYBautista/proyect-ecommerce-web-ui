import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductServicesService {

  private url:string="http://localhost:5000/api/v1/admin/products/";

  constructor(
    private httpClient: HttpClient
  ) { }

  public getProducts():Observable<Product[]>{

    return this.httpClient.get<Product[]>(this.url + "listProducts");

  }

  public createProduct(formData:any):Observable<any>{

    return this.httpClient.post<Product>(this.url + "saveProduct",formData);

  }

  public deleteProductById(id:number):Observable<any>{

    return this.httpClient.delete(this.url + "deleteProduct/" + id);

  }

  public getProductById(id:number):Observable<Product>{

    return this.httpClient.get<Product>(this.url + "findProduct/"+id);

  }
}
