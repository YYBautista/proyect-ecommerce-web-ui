import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../common/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private url: string = 'http://localhost:5000/api/v1/orders/';
  private update: string = 'update/state/order';

  constructor(private httpClient: HttpClient) {}

  public createdOrder(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(this.url + 'createOrder', order);
  }

  public updateOrder(formData: any): Observable<any> {
    return this.httpClient.post(`${this.url}` + this.update, formData);
  }

  public getOrderByUser(userId: number): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.url}ordersByUserId/${userId}`);
  }

  public getOrderById(orderId: number): Observable<Order> {
    return this.httpClient.get<Order>(`${this.url}ordersById/${orderId}`);
  }
}
