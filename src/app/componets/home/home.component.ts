import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductServicesService } from '../../Services/product-services.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderUserComponent } from '../header-user/header-user.component';

@Component({
  selector: 'app-home',
  imports: [NgFor, RouterLink, HeaderUserComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductServicesService) {}

  ngOnInit(): void {
    this.productService
      .getProducts()
      .subscribe((data) => (this.products = data));
  }
}
