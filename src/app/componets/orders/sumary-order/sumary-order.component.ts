import { Component, OnInit } from '@angular/core';
import { HeaderUserComponent } from '../../header-user/header-user.component';
import { RouterLink } from '@angular/router';
import { ItemCart } from '../../../common/item-cart';
import { CartService } from '../../../Services/cart.service';
import { NgFor } from '@angular/common';
import { UserService } from '../../../Services/user.service';
import { OrderProduct } from '../../../common/order-product';
import { Order } from '../../../common/order';
import { OrderState } from '../../../common/order-state';
import { OrderService } from '../../../Services/order.service';
import { PaymentService } from '../../../Services/payment.service';
import { DataPayment } from '../../../common/data-payment';
import { SessionStorageService } from '../../../Services/session-storage.service';

@Component({
  selector: 'app-sumary-order',
  imports: [NgFor, HeaderUserComponent, RouterLink],
  templateUrl: './sumary-order.component.html',
  styleUrl: './sumary-order.component.css',
})
export class SumaryOrderComponent implements OnInit {
  items: ItemCart[] = [];
  totalCart: number = 0;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  address: string = '';
  orderProducts: OrderProduct[] = [];
  userId: number = 1;

  ngOnInit(): void {
    this.items = this.cartService.convertToListFromMap();
    this.totalCart = this.cartService.totalCart();
    this.getUserById(this.userId);
  }

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private orderService: OrderService,
    private paymentService: PaymentService,
    private sessionStorageService: SessionStorageService
  ) {}

  public generatedOrder() {
    this.items.forEach((item) => {
      let orderProduct = new OrderProduct(
        null,
        item.productId,
        item.quantity,
        item.price
      );
      this.orderProducts.push(orderProduct);
    });

    let order = new Order(
      null,
      new Date(),
      this.orderProducts,
      this.userId,
      OrderState.CANCELLED
    );

    this.orderService.createdOrder(order).subscribe((data) => {
      console.log('Orden creada con id : ' + data.id);
      this.sessionStorageService.setItem('order', data);
    });

    //Redireción y Pago con PAYPAL
    let urlPayment;
    let dataPayment = new DataPayment(
      'PAYPAL',
      this.totalCart.toString(),
      'USD',
      'COMPRA'
    );

    this.paymentService.getUrlPaypalPayment(dataPayment).subscribe((data) => {
      urlPayment = data.url;
      console.log('Respuesta exitosa...  ' + urlPayment);
      window.location.href = urlPayment;
    });
  }

  public deleteItemCart(productId: number) {
    this.cartService.deleteItemCar(productId);
    this.items = this.cartService.convertToListFromMap();
    this.totalCart = this.cartService.totalCart();
  }

  public getUserById(id: number) {
    this.userService.getUserById(id).subscribe((data) => {
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.email = data.email;
      this.address = data.address;
    });
  }
}
