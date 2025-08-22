import { Component, OnInit } from '@angular/core';
import { HeaderUserComponent } from '../header-user/header-user.component';
import { OrderService } from '../../Services/order.service';
import { SessionStorageService } from '../../Services/session-storage.service';
import { OrderState } from '../../common/order-state';

@Component({
  selector: 'app-payment-success',
  imports: [HeaderUserComponent],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css',
})
export class PaymentSuccessComponent implements OnInit {
  ngOnInit(): void {
    const order = this.sessionStorageService.getItem<{ id: string }>('order');

    if (!order || !order.id) {
      console.warn('No se encontró la orden en sessionStorage');
      return;
    }

    const formData = new FormData();
    formData.append('id', order.id);
    formData.append('state', OrderState.CONFIRMED.toString());

    this.orderService.updateOrder(formData).subscribe({
      next: (data) => console.log('Orden actualizada:', order),
      error: (err) => console.error('Error al actualizar orden:', order, err),
    });
  }

  constructor(
    private orderService: OrderService,
    private sessionStorageService: SessionStorageService
  ) {}
}
