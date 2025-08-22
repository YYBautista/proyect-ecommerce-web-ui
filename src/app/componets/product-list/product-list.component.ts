import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductServicesService } from '../../Services/product-services.service';
import { NgFor } from '@angular/common';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  imports: [NgFor, HeaderAdminComponent, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductServicesService) {}

  ngOnInit(): void {
    this.listProducts();
  }

  public listProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      console.log(data);
    });
  }

  public deleteProductById(id: number) {
    Swal.fire({
      title: '¿Estas seguro que quiere eliminar este registro?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService
          .deleteProductById(id)
          .subscribe(() => this.listProducts());
        Swal.fire({
          title: 'Producto Eliminado!',
          text: ' El producto se a eliminado exitosamente.',
          icon: 'success',
        });
      }
    });
  }
}
