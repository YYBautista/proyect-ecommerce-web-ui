import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderUserComponent } from '../header-user/header-user.component';
import { HomeService } from '../../Services/home.service';

@Component({
  selector: 'app-home',
  imports: [NgFor, RouterLink, HeaderUserComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService
      .getProducts()
      .subscribe((data) => (this.products = data));
  }
}
