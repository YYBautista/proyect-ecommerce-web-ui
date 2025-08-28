import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataPayment } from '../common/data-payment';
import { Observable } from 'rxjs';
import { UrlPaypalResponse } from '../common/url-paypal-response';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private url: string = 'http://localhost:5000/api/v1/payments';

  constructor(private http: HttpClient, private headerService: HeaderService) {}

  public getUrlPaypalPayment(
    dataPayment: DataPayment
  ): Observable<UrlPaypalResponse> {
    return this.http.post<UrlPaypalResponse>(this.url, dataPayment, {
      headers: this.headerService.headers,
    });
  }
}
